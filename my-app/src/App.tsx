import RecipeCard from "./components/RecipeCard";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { InventoryPage } from "./views/InventoryPage";
import { RecipesPage } from "./views/RecipesPage";

export default function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Studentsmarta Recept</h1>
        <p>kopplade till det du har hemma och butikers reor</p>
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
    </div>
  );
}
