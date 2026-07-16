
import { Ingredient, Recipe, Category, UserPreferences, AppSettings, ModelOption } from "../types";

// Normalize a user-provided OpenAI-compatible base URL.
const cleanUrl = (url: string) => {
  return url.trim().replace(/\/+$/, '');
};

const buildApiUrl = (baseUrl: string, path: string) => {
  const normalizedPath = path.replace(/^\/+/, '');
  return `${baseUrl}/${normalizedPath}`;
};

/** Fetch available models from an OpenAI-compatible endpoint. */
export const fetchAvailableModels = async (settings: AppSettings): Promise<ModelOption[]> => {
  const apiKey = settings.apiKey?.trim();
  const apiUrl = settings.apiUrl?.trim();

  if (!apiUrl || !apiKey) {
    throw new Error("请先配置 API 地址和密钥");
  }

  const baseUrl = cleanUrl(apiUrl);
  const url = buildApiUrl(baseUrl, 'models');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      const err = await response.text();
      let errorMsg = `连接失败 (${response.status})`;
      try {
        const jsonErr = JSON.parse(err);
        if (jsonErr.error?.message) {
            errorMsg += `: ${jsonErr.error.message}`;
        } else if (jsonErr.error?.code) {
             errorMsg += `: Error Code ${jsonErr.error.code}`;
        }
      } catch {
        errorMsg += `: ${err.substring(0, 100)}`;
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    
    // OpenAI-compatible response: { data: [...] }
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((m: any) => ({
        name: m.id,
        displayName: m.id
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Failed to fetch models", error);
    // Propagate the specific error message
    throw new Error(error.message || "获取模型列表失败");
  }
};

/** Generate recipes through an OpenAI-compatible Chat Completions endpoint. */
export const generateRecipes = async (
  ingredients: Ingredient[],
  preferences: UserPreferences,
  settings: AppSettings
): Promise<Recipe[]> => {
  const apiKey = settings.apiKey?.trim();
  const apiUrl = settings.apiUrl?.trim();

  if (!apiUrl || !apiKey) {
    throw new Error("请先在设置中配置 API 连接信息！");
  }
  
  if (ingredients.length === 0) {
    throw new Error("请先添加一些食材到冰箱！");
  }

  // --- Prompt Construction (Shared) ---
  const mustUseNames = ingredients
    .filter(i => preferences.mustUseIngredientIds?.includes(i.id))
    .map(i => i.name);

  const groupedList = ingredients.reduce((acc, curr) => {
    const cat = curr.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr.name);
    return acc;
  }, {} as Record<Category, string[]>);

  const contextStr = Object.entries(groupedList)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join('\n');

  const mustUsePrompt = mustUseNames.length > 0 
    ? `必须包含的食材: ${mustUseNames.join(', ')}` 
    : "无必须包含的食材。";

  const userNotesPrompt = preferences.additionalNotes 
    ? `用户的额外要求/备注: "${preferences.additionalNotes}"` 
    : "";

  const systemPrompt = `
    你是一位极度注重细节的五星级烹饪导师。你的目标是让从未进过厨房的新手也能一次成功。
    请根据用户现有的食材和偏好，推荐 3 道美味且成功率高的菜肴。
    **重要：请只返回纯 JSON 格式数据，不要包含 Markdown 代码块 (\`\`\`json) 或其他文字。**
  `;

  const userPrompt = `
    用户现有食材（按存储位置分类）：
    ${contextStr}
    
    特定要求：
    - 菜系风格：${preferences.cuisine}
    - 口味偏好：${preferences.taste}
    - ${mustUsePrompt}
    - ${userNotesPrompt}
    
    核心生成规则（严格执行）：
    1. **步骤详情化 (防翻车公式)**：
       每一个步骤字符串必须严格遵循公式：**步骤 = 行为 + 条件 + 时间 + 判断**。
       * 行为 (Action): 具体做什么 (如: 快速滑炒, 小火慢炖)。
       * 条件 (Condition): 火候/油温/前置状态 (如: 保持中小火, 待油温微热)。
       * 时间 (Time): 具体的量化时间 (如: 约30秒, 焖煮15分钟)。
       * 判断 (Judgment): 视觉/嗅觉/触觉的完成标准 (如: 至肉丝变白断生, 闻到浓烈蒜香, 筷子能轻松插入)。
       
       * 错误示范："炒肉丝。"
       * 正确示范："开大火（条件）将锅烧至冒微烟，倒入冷油（行为），立即下入腌制好的肉丝快速滑炒（行为），约30秒（时间）至肉丝变白且根根分明（判断）。"
    
    2. **存储状态感知**：如果使用了冷冻食材，步骤的第一步必须包含科学的解冻说明（如：提前冷藏解冻或微波炉解冻建议）。
    
    3. **避坑指南 (Failure Points)**：
       必须列出极易出错的细节（例如：“如果火太大，蒜末会在5秒内变焦发苦” 或 “一定要擦干水分防止炸锅”）。

    4. **JSON 结构** (数组):
       [
         {
           "name": "菜名",
           "description": "一句话介绍亮点",
           "difficulty": "简单/中等/困难",
           "cookingTime": "例如：20分钟",
           "mainIngredientsUsed": ["食材1", "食材2"],
           "missingIngredients": ["缺少但必须的食材"],
           "steps": ["步骤1", "步骤2", "步骤3..."],
           "failurePoints": ["避坑1", "避坑2"]
         }
       ]
  `;

  const baseUrl = cleanUrl(apiUrl);
  const url = buildApiUrl(baseUrl, 'chat/completions');
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = `API 请求失败 (${response.status})`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.error?.message) errMsg += `: ${errJson.error.message}`;
      } catch (e) {
        errMsg += `: ${errText}`;
      }
      throw new Error(errMsg);
    }

    const data = await response.json();
    let text = data.choices?.[0]?.message?.content || '';

    if (!text) {
      throw new Error("API 返回了空内容。");
    }
    
    // Cleanup markdown if present
    text = text.trim();
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Attempt to fix common JSON errors (optional, simple safeguard)
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    if (jsonStart !== -1 && jsonEnd !== -1) {
        text = text.substring(jsonStart, jsonEnd + 1);
    }

    const recipes = JSON.parse(text) as Recipe[];
    return recipes;

  } catch (error: any) {
    console.error("Recipe generation failed:", error);
    throw new Error(error.message || "生成失败，请检查设置。");
  }
};
