import { DEMO_SCENARIOS, DEFAULT_DEMO_SCENARIO } from '../data/demoScenarios';
import { Ingredient, Recipe, UserPreferences } from '../types';

const normalize = (value: string) => value.trim().toLowerCase();

export const getDemoRecipes = async (
  ingredients: Ingredient[],
  _preferences: UserPreferences,
  preferredScenarioId?: string
): Promise<Recipe[]> => {
  const preferred = preferredScenarioId
    ? DEMO_SCENARIOS.find(scenario => scenario.id === preferredScenarioId)
    : undefined;

  const currentNames = new Set(ingredients.map(ingredient => normalize(ingredient.name)));
  const matched = preferred || DEMO_SCENARIOS.reduce((best, scenario) => {
    const score = scenario.ingredients.reduce(
      (total, ingredient) => total + (currentNames.has(normalize(ingredient.name)) ? 1 : 0),
      0
    );
    const bestScore = best.ingredients.reduce(
      (total, ingredient) => total + (currentNames.has(normalize(ingredient.name)) ? 1 : 0),
      0
    );
    return score > bestScore ? scenario : best;
  }, DEFAULT_DEMO_SCENARIO);

  await new Promise(resolve => window.setTimeout(resolve, 750));
  return matched.recipes;
};
