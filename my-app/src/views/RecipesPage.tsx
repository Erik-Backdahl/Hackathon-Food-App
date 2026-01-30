import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockRecipes } from "../components/mockdata";
import {
  type FilterOptions,
  filterRecipes,
  loadInventoryFromStorage,
} from "../components/inventory";
import "./RecipesPage.css";

export function RecipesPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: "all",
    prepTime: "any",
    recipeType: "any",
  });
  const [isOpen, setIsOpen] = useState(true);

  const selectedIngredients = useMemo(() => loadInventoryFromStorage(), []);

  const matchingRecipes = useMemo(
    () => filterRecipes(mockRecipes, selectedIngredients, filters),
    [filters, selectedIngredients],
  );

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
          <div className="filter-group">
            <h4>Dietary</h4>
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
          </div>

          <div className="filter-group">
            <h4>Prep Time</h4>
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
          </div>

          <div className="filter-group">
            <h4>Recipe Type</h4>
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
          </div>
        </div>
      </div>

      <div className="results-summary">
        Matching Recipes: {matchingRecipes.length}
      </div>

      <div className="recipes-grid">
        {matchingRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-card-body">
              <h3>{recipe.title}</h3>
              <p>
                ⏱️ {recipe.readyInMinutes} min | 👥 {recipe.servings} servings
              </p>
              <div className="recipe-tags">
                {recipe.vegetarian && <span>🥬 Vegetarian</span>}
                {recipe.vegan && <span>🌱 Vegan</span>}
                {recipe.glutenFree && <span>🌾 Gluten Free</span>}
                {recipe.dairyFree && <span>🥛 Dairy Free</span>}
                {recipe.healthy && <span>💚 Healthy</span>}
                {recipe.sustainable && <span>♻️ Sustainable</span>}
                {recipe.popular && <span>⭐ Popular</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
