import RecipeCard from './components/RecipeCard';
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { InventoryPage } from "./views/InventoryPage";
import { RecipesPage } from "./views/RecipesPage";

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Recipe App</h1>
        <nav className="app-nav">
          <NavLink to="/recipes" className="nav-link">
            Recipes
          </NavLink>
          <NavLink to="/inventory" className="nav-link">
            Inventory
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
      <RecipeCard title='pizza' image='' have={["Pepperoni", "Cheese"]} need={["Flour", "Yeast"]}tag='Cheap And Quick!'/>
    </div>
  );
}