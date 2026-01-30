import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import {
  type FilterOptions,
  filterRecipes,
  loadInventoryFromStorage,
  normalizeIngredientName,
  type Recipe,
} from "../components/inventory";
import { mockRecipes } from "../data/mockRecipies";
import "./RecipesPage.css";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: "all",
    prepTime: "any",
    recipeType: "any",
  });

  const [isOpen, setIsOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  useEffect(() => {
    setRecipes(mockRecipes)
    // fetch("/api/recipes")
    //   .then((res) => res.json())
    //   .then(setRecipes);
  }, []);

  const selectedIngredients = useMemo(() => loadInventoryFromStorage(), []);

  const matchingRecipes = useMemo(
    () => filterRecipes(recipes, selectedIngredients, filters),
    [recipes, filters, selectedIngredients],
  );

  const splitHaveNeed = (recipe: Recipe) => {
    const have: string[] = [];
    const need: string[] = [];

    recipe.extendedIngredients.forEach((ing) => {
      const normalized = normalizeIngredientName(ing.name);
      if (selectedIngredients.has(normalized)) {
        have.push(ing.name);
      } else {
        need.push(ing.name);
      }
    });

    return { have, need };
  }

  const getTag = (recipe: Recipe) => {
    if (recipe.cheap) return { tag: "Budget", tagColor: "#16a34a" };
    if (recipe.healthy) return { tag: "Healthy", tagColor: "#0ea5e9" };
    if (recipe.sustainable) return { tag: "Sustainable", tagColor: "#10b981" };
    if (recipe.vegan) return { tag: "Vegan", tagColor: "#22c55e" };
    return { tag: `${recipe.readyInMinutes} min`, tagColor: "#111827" };
  };

  const setSingleCheckbox = <
    T extends "all" | "vegetarian" | "vegan" | "gluten-free" | "dairy-free",
  >(
    key: "dietary",
    value: T,
    checked: boolean,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked ? value : "all",
    }));
  };

  const setPrepTime = (value: FilterOptions["prepTime"], checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      prepTime: checked ? value : "any",
    }));
  };

  const setRecipeType = (
    value: FilterOptions["recipeType"],
    checked: boolean,
  ) => {
    setFilters((prev) => ({
      ...prev,
      recipeType: checked ? value : "any",
    }));
  };

  const FilterGroup = ({
    title,
    groupId,
    children,
  }: {
    title: string;
    groupId: string;
    children: React.ReactNode;
  }) => {
    const isGroupOpen = openGroups.has(groupId);
    return (
      <div className="filter-group-wrapper">
        <button
          className="filter-group-toggle"
          onClick={() => toggleGroup(groupId)}
          aria-expanded={isGroupOpen}
        >
          <h4>{title}</h4>
          <span className={`group-arrow ${isGroupOpen ? "open" : ""}`}>▾</span>
        </button>
        <div className={`filter-group-content ${isGroupOpen ? "open" : ""}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <h2>Recipes</h2>
        <Link to="/inventory" className="btn-secondary">
          Edit Inventory
        </Link>
      </div>

      <div className="filter-container">
        <button
          className="filter-toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
        >
          <span>Filters</span>
          <span className={`arrow ${isOpen ? "open" : ""}`}>▾</span>
        </button>

        <div className={`filter-panel ${isOpen ? "open" : ""}`}>
          <FilterGroup title="Dietary" groupId="dietary">
            <label>
              <input
                type="checkbox"
                checked={filters.dietary === "vegetarian"}
                onChange={(e) =>
                  setSingleCheckbox("dietary", "vegetarian", e.target.checked)
                }
              />
              Vegetarian
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.dietary === "vegan"}
                onChange={(e) =>
                  setSingleCheckbox("dietary", "vegan", e.target.checked)
                }
              />
              Vegan
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.dietary === "gluten-free"}
                onChange={(e) =>
                  setSingleCheckbox("dietary", "gluten-free", e.target.checked)
                }
              />
              Gluten Free
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.dietary === "dairy-free"}
                onChange={(e) =>
                  setSingleCheckbox("dietary", "dairy-free", e.target.checked)
                }
              />
              Dairy Free
            </label>
          </FilterGroup>

          <FilterGroup title="Prep Time" groupId="prepTime">
            <label>
              <input
                type="checkbox"
                checked={filters.prepTime === "15"}
                onChange={(e) => setPrepTime("15", e.target.checked)}
              />
              15 min
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.prepTime === "30"}
                onChange={(e) => setPrepTime("30", e.target.checked)}
              />
              30 min
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.prepTime === "60"}
                onChange={(e) => setPrepTime("60", e.target.checked)}
              />
              60 min
            </label>
          </FilterGroup>

          <FilterGroup title="Recipe Type" groupId="recipeType">
            <label>
              <input
                type="checkbox"
                checked={filters.recipeType === "cheap"}
                onChange={(e) => setRecipeType("cheap", e.target.checked)}
              />
              Cheap
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.recipeType === "healthy"}
                onChange={(e) => setRecipeType("healthy", e.target.checked)}
              />
              Healthy
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.recipeType === "sustainable"}
                onChange={(e) => setRecipeType("sustainable", e.target.checked)}
              />
              Sustainable
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.recipeType === "popular"}
                onChange={(e) => setRecipeType("popular", e.target.checked)}
              />
              Popular
            </label>
          </FilterGroup>
        </div>
      </div>

      <div className="results-summary">
        Matching Recipes: {matchingRecipes.length}
      </div>

      <div className="recipes-grid">
        {matchingRecipes.map((recipe) => {
          const { have, need } = splitHaveNeed(recipe);
          const { tag, tagColor } = getTag(recipe);

          return (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              have={have}
              need={need}
              tag={tag}
              tagColor={tagColor}
            />
          );
        })}
      </div>
    </div>
  );
}
