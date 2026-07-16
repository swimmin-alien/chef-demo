import { Category, DemoScenario } from '../types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'quick-after-work',
    title: '下班快手餐',
    description: '用常见食材快速完成一顿热饭。',
    ingredients: [
      { id: 'demo-egg', name: '鸡蛋', category: Category.REFRIGERATED },
      { id: 'demo-tomato', name: '番茄', category: Category.REFRIGERATED },
      { id: 'demo-noodle', name: '面条', category: Category.STAPLE },
      { id: 'demo-scallion', name: '小葱', category: Category.REFRIGERATED },
    ],
    recipes: [
      {
        name: '番茄鸡蛋拌面',
        description: '酸甜浓郁的番茄蛋浇头，十几分钟就能完成。',
        difficulty: '简单', cookingTime: '15分钟',
        mainIngredientsUsed: ['番茄', '鸡蛋', '面条', '小葱'],
        missingIngredients: ['生抽'],
        steps: [
          '番茄切小块、鸡蛋打散；中火热锅约30秒，倒入少量油，待油面微微流动时下蛋液，快速推炒约40秒至刚凝固后盛出。',
          '保持中火下番茄翻炒约3分钟，加入两勺清水和少量生抽，煮至番茄软化并形成浓稠汤汁。',
          '面条放入沸水中煮约4分钟，夹起一根尝到无硬芯后沥水，拌入番茄鸡蛋并撒上小葱。',
        ],
        failurePoints: ['鸡蛋刚凝固就要盛出，继续加热会变老。', '番茄要切小块，才能在短时间内炒出汤汁。'],
      },
      {
        name: '葱香鸡蛋汤面',
        description: '清爽温暖的一碗汤面，适合时间紧张的晚上。',
        difficulty: '简单', cookingTime: '12分钟',
        mainIngredientsUsed: ['鸡蛋', '面条', '小葱'],
        missingIngredients: ['香油'],
        steps: [
          '锅中加入约600毫升清水，大火加热约4分钟至持续沸腾，再放入面条并用筷子拨散。',
          '保持中火煮约3分钟，待面条中心只剩细小白芯时，将打散的蛋液沿锅边缓慢淋入。',
          '静置10秒后轻推蛋花，继续煮约40秒至蛋花完全凝固，关火后加入小葱和少量香油。',
        ],
        failurePoints: ['蛋液入锅后不要立刻搅动，否则蛋花会过碎。', '面条不要完全煮熟后再加蛋液，容易变软。'],
      },
      {
        name: '番茄厚蛋烧',
        description: '把番茄的酸甜包进松软蛋饼，适合搭配主食。',
        difficulty: '中等', cookingTime: '18分钟',
        mainIngredientsUsed: ['番茄', '鸡蛋', '小葱'],
        missingIngredients: ['牛奶'],
        steps: [
          '番茄去瓤切成小丁，与蛋液、两勺牛奶和葱花混合，搅拌约20秒至颜色均匀。',
          '平底锅保持小火预热约40秒并薄薄刷油，倒入三分之一蛋液，晃锅摊平至表面八成凝固。',
          '从一侧卷起蛋皮，重复倒入和卷起剩余蛋液，最后每面煎约30秒至外层金黄且按压有弹性。',
        ],
        failurePoints: ['番茄瓤水分多，保留会让蛋饼难以成形。', '全程使用小火，火大时底部焦了而表面仍未凝固。'],
      },
    ],
  },
  {
    id: 'light-fitness',
    title: '健身低脂餐',
    description: '围绕蛋白质和蔬菜组织的一餐。',
    ingredients: [
      { id: 'demo-chicken', name: '鸡胸肉', category: Category.REFRIGERATED },
      { id: 'demo-broccoli', name: '西兰花', category: Category.REFRIGERATED },
      { id: 'demo-sweet-potato', name: '红薯', category: Category.ROOM_TEMP },
    ],
    recipes: [
      {
        name: '香煎鸡胸配西兰花', description: '少油煎制，保留鸡胸肉的汁水。', difficulty: '简单', cookingTime: '25分钟',
        mainIngredientsUsed: ['鸡胸肉', '西兰花'], missingIngredients: ['黑胡椒'],
        steps: ['鸡胸肉横向片薄并擦干水分，加盐和黑胡椒腌制约10分钟，至表面微微出水。', '平底锅中火预热约1分钟后薄刷油，下鸡胸每面煎约3分钟，中心完全变白且流出透明汁水后离火。', '西兰花放入沸水焯约90秒至颜色鲜绿且梗部仍有脆感，沥水后与鸡胸装盘。'],
        failurePoints: ['鸡胸厚度尽量一致，否则熟度不均。', '煎好后静置2分钟再切，汁水不易流失。'],
      },
      {
        name: '鸡肉西兰花暖碗', description: '红薯提供饱腹感，适合作为完整的一餐。', difficulty: '简单', cookingTime: '30分钟',
        mainIngredientsUsed: ['鸡胸肉', '西兰花', '红薯'], missingIngredients: ['柠檬'],
        steps: ['红薯切成2厘米小块，放入蒸锅大火蒸约15分钟，筷子能轻松插入时取出。', '鸡胸肉切丁，中火热锅后翻炒约5分钟，至所有切面变白且内部没有粉色。', '加入焯好的西兰花翻炒约1分钟，待表面水汽散去后与红薯组合，挤少量柠檬汁。'],
        failurePoints: ['红薯块过大会明显延长蒸制时间。', '西兰花焯水后要充分沥干，避免炒制时大量出水。'],
      },
      {
        name: '红薯鸡肉温沙拉', description: '清爽但有饱腹感的温热沙拉。', difficulty: '中等', cookingTime: '28分钟',
        mainIngredientsUsed: ['鸡胸肉', '西兰花', '红薯'], missingIngredients: ['酸奶'],
        steps: ['红薯切小块蒸约15分钟，至边缘变软但仍能保持形状。', '鸡胸肉用小火煮约12分钟，最厚处切开完全变白后捞出，静置2分钟再撕成条。', '将温热食材轻轻拌匀，加入两勺无糖酸奶，拌至每块食材表面均匀裹上薄层酱汁。'],
        failurePoints: ['鸡肉不要持续大火沸煮，会快速变柴。', '红薯仍然很热时不要用力搅拌，容易碎成泥。'],
      },
    ],
  },
  {
    id: 'frozen-clear-out',
    title: '冷冻库存清理',
    description: '演示对冷冻状态和剩余食材的处理。',
    ingredients: [
      { id: 'demo-shrimp', name: '冷冻虾仁', category: Category.FROZEN },
      { id: 'demo-rice', name: '剩米饭', category: Category.STAPLE },
      { id: 'demo-carrot', name: '胡萝卜', category: Category.REFRIGERATED },
      { id: 'demo-frozen-egg', name: '鸡蛋', category: Category.REFRIGERATED },
    ],
    recipes: [
      {
        name: '虾仁黄金炒饭', description: '粒粒分明的剩饭搭配弹嫩虾仁。', difficulty: '中等', cookingTime: '20分钟',
        mainIngredientsUsed: ['冷冻虾仁', '剩米饭', '胡萝卜', '鸡蛋'], missingIngredients: ['白胡椒'],
        steps: ['虾仁提前放冷藏解冻一晚，或装入密封袋浸冷水约15分钟，完全变软后擦干表面水分。', '鸡蛋炒至刚凝固盛出；锅中保持中大火，下虾仁和胡萝卜炒约2分钟，至虾仁卷曲变粉。', '加入打散的剩米饭持续翻炒约3分钟，至米粒松散并有轻微跳动感，再加入鸡蛋调味。'],
        failurePoints: ['虾仁必须擦干，否则下锅会大量出水。', '结块米饭要提前拨散，不能在锅里用力压碎。'],
      },
      {
        name: '虾仁胡萝卜蒸蛋', description: '口感柔滑，突出冷冻虾仁的鲜味。', difficulty: '简单', cookingTime: '22分钟',
        mainIngredientsUsed: ['冷冻虾仁', '胡萝卜', '鸡蛋'], missingIngredients: ['香油'],
        steps: ['虾仁使用冷水密封浸泡约15分钟解冻，擦干后切小段，胡萝卜切成细末。', '蛋液加入1.5倍温水轻轻混合并过筛，静置1分钟至表面没有明显气泡。', '盖上耐热盘后中小火蒸约10分钟，待中心轻晃如果冻般颤动时关火，再焖2分钟。'],
        failurePoints: ['不要使用沸水调蛋液，会提前形成蛋花。', '蒸制火力过大容易产生蜂窝孔。'],
      },
      {
        name: '虾仁蔬菜烩饭', description: '用一口锅把剩饭变成浓郁暖胃的烩饭。', difficulty: '简单', cookingTime: '18分钟',
        mainIngredientsUsed: ['冷冻虾仁', '剩米饭', '胡萝卜'], missingIngredients: ['高汤'],
        steps: ['虾仁在冷藏环境解冻后擦干；若时间有限，使用密封袋冷水浸泡约15分钟，不要直接用热水。', '胡萝卜中火炒约2分钟至边缘微微透明，加入米饭和一碗高汤并搅散。', '保持小火煮约6分钟，汤汁变浓后加入虾仁再煮约2分钟，至虾仁卷曲且完全变粉。'],
        failurePoints: ['虾仁最后加入，久煮会缩小变硬。', '汤汁收干后要立即关火，余温还会继续吸水。'],
      },
    ],
  },
];

export const DEFAULT_DEMO_SCENARIO = DEMO_SCENARIOS[0];
