import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllIngredients,
  loadInventoryFromStorage,
  normalizeIngredientName,
  saveInventoryToStorage,
  type Recipe,
} from "../components/inventory";
import { mockRecipes } from "../data/mockRecipies";
import "./InventoryPage.css";

export function InventoryPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    () => loadInventoryFromStorage(),
  );

  useEffect(() => {
    setRecipes(mockRecipes);
    // fetch("/api/recipes")
    //   .then((res) => res.json())
    //   .then(setRecipes);
  }, []);

  useEffect(() => {
    saveInventoryToStorage(selectedIngredients);
  }, [selectedIngredients]);

  const allIngredients = useMemo(() => getAllIngredients(recipes), [recipes]);

  const filteredIngredients = allIngredients.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleIngredient = (ingredientName: string) => {
    setSelectedIngredients((prev) => {
      const newSet = new Set(prev);
      const normalized = normalizeIngredientName(ingredientName);
      if (newSet.has(normalized)) {
        newSet.delete(normalized);
      } else {
        newSet.add(normalized);
      }
      return newSet;
    });
  };

  const clearAll = () => {
    setSelectedIngredients(new Set());
  };

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h2>My Inventory</h2>
        <div className="inventory-actions">
          <button className="btn-secondary" onClick={clearAll}>
            Clear
          </button>
          <Link to="/recipes" className="btn-primary">
            Go to Recipes
          </Link>
        </div>
      </div>

      <div className="inventory-search">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="inventory-list">
        {filteredIngredients.map((ingredientName) => {
          const normalized = normalizeIngredientName(ingredientName);
          return (
            <label key={normalized} className="ingredient-checkbox">
              <input
                type="checkbox"
                checked={selectedIngredients.has(normalized)}
                onChange={() => toggleIngredient(ingredientName)}
              />
              <span>{ingredientName}</span>
            </label>
          );
        })}
      </div>

      <div className="inventory-summary">
        Selected: {selectedIngredients.size}
      </div>
    </div>
  );
}
