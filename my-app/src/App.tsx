


import './App.css';
import RecipeCard from './components/RecipeCard';

function App() {

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

  <RecipeCard 
    title='pancakes' 
    image='' 
    have={["Flour", "Eggs"]} 
    need={["Milk", "Butter"]} 
    tag='Breakfast' />

  <RecipeCard 
    title='salad' 
    image='' 
    have={["Lettuce", "Tomato"]} 
    need={["Cucumber", "Olive Oil"]} 
    tag='Healthy' />
    </>
  )
}

export default App
