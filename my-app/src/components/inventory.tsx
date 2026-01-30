export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  cheap: boolean;
  healthy: boolean;
  sustainable: boolean;
  popular: boolean;
  extendedIngredients: ExtendedIngredient[];
}

export interface ExtendedIngredient {
  id: number;
  name: string;
  ailse: string;
  amount: number;
  unit: string;
}

export interface FilterOptions {
  dietary: "all" | "vegetarian" | "vegan" | "gluten-free" | "dairy-free";
  prepTime: "any" | "15" | "30" | "60";
  recipeType: "any" | "cheap" | "healthy" | "sustainable" | "popular";
}

export interface InventoryContextType {
  selectedIngredients: Set<string>;
  filters: FilterOptions;
  recipes: Recipe[];
  toggleIngredient: (ingredientName: string) => void;
  updateFilters: (filterType: keyof FilterOptions, value: string) => void;
  getMatchingRecipies: () => Recipe[];
}

export const INVENTORY_STORAGE_KEY = "recipe-app:inventory";

export const normalizeIngredientName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
};

export const loadInventoryFromStorage = (): Set<string> => {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((v) => typeof v === "string"));
  } catch {
    return new Set();
  }
};

export const saveInventoryToStorage = (selected: Set<string>) => {
  localStorage.setItem(
    INVENTORY_STORAGE_KEY,
    JSON.stringify(Array.from(selected)),
  );
};

export const getAllIngredients = (recipes: Recipe[]): string[] => {
  return Array.from(
    new Map(
      recipes
        .flatMap((recipe) => recipe.extendedIngredients)
        .map((ing) => [normalizeIngredientName(ing.name), ing.name]),
    ).values(),
  ).sort();
};

export const filterRecipes = (
  recipes: Recipe[],
  selectedIngredients: Set<string>,
  filters: FilterOptions,
): Recipe[] => {
  return recipes.filter((recipe) => {
    if (filters.dietary === "gluten-free" && !recipe.glutenFree) return false;
    if (filters.dietary === "dairy-free" && !recipe.dairyFree) return false;
    if (filters.dietary === "vegan" && !recipe.vegan) return false;
    if (filters.dietary === "vegetarian" && !recipe.vegetarian && !recipe.vegan)
      return false;

    if (filters.prepTime !== "any") {
      const maxTime = parseInt(filters.prepTime);
      if (recipe.readyInMinutes > maxTime) return false;
    }

    if (filters.recipeType === "cheap" && !recipe.cheap) return false;
    if (filters.recipeType === "healthy" && !recipe.healthy) return false;
    if (filters.recipeType === "sustainable" && !recipe.sustainable)
      return false;
    if (filters.recipeType === "popular" && !recipe.popular) return false;

    if (selectedIngredients.size > 0) {
      const recipeIngredients = recipe.extendedIngredients.map((ing) =>
        normalizeIngredientName(ing.name),
      );

      const hasMatchingIngredient = Array.from(selectedIngredients).some(
        (selected) =>
          recipeIngredients.some(
            (recipeIng) =>
              recipeIng.includes(selected) || selected.includes(recipeIng),
          ),
      );

      if (!hasMatchingIngredient) return false;
    }

    return true;
  });
};
