


import './App.css';
import RecipeCard from './components/RecipeCard';
import { useState } from 'react';

type Recipe = {
  title: string;
  image: string;
  have: string[];
  need: string[];
  tag: string;
  tagColor?: string;
}

function App() {

   const [budget, setBudget] = useState("Under $5");
  const [difficulty, setDifficulty] = useState("Easy");
  const [ingredients, setIngredients] = useState(""); ``
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <>
    <RecipeCard 
    title='pizza' 
    image='' 
    have={["Pepperoni", "Cheese"]} 
    need={["Flour", "Yeast"]}
    tag='Cheap And Quick!' />
    
    <RecipeCard 
    title='burger' 
    image='' 
    have={["Buns", "Cheese"]} 
    need={["Beef Patty", "Lettuce", "Tomato"]} 
    tag='Fast Food' />
    </>
  )
}

export default App
