import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { InventoryPage } from "./views/InventoryPage";
import { RecipesPage } from "./views/RecipesPage";

export default function App() {
  return (
    <div>
      <header className="app-header">
        <div className="header-content">
          <h1>Studentsmarta Recept</h1>
          <p className="header-subtitle">
            kopplade till det du har hemma och butikers reor
          </p>

          <nav className="app-nav">
            <NavLink to="/inventory" className="nav-link nav-secondary">
              Ditt inventory
            </NavLink>
            <NavLink to="/recipes" className="nav-link nav-primary">
              Sparade recept
            </NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </div>
  );
}
