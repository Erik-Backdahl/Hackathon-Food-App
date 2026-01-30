


import './App.css';
import RecipeCard from './components/RecipeCard';

function App() {

  return (
    <>
    <RecipeCard 
    title='pizza' 
    image='exampleFood.png' 
    have={["Eggs", "Milk"]} 
    need={["Flour", "Sugar"]}
    tag='Cheap And Quick!' />
    
    <RecipeCard 
    title='burger' 
    image='burger.png' 
    have={["Buns", "Cheese"]} 
    need={["Beef Patty", "Lettuce", "Tomato"]} 
    tag='Fast Food' />

  <RecipeCard 
    title='pancakes' 
    image='pancakes.png' 
    have={["Flour", "Eggs"]} 
    need={["Milk", "Butter"]} 
    tag='Breakfast' />

  <RecipeCard 
    title='salad' 
    image='salad.png' 
    have={["Lettuce", "Tomato"]} 
    need={["Cucumber", "Olive Oil"]} 
    tag='Healthy' />
    </>
  )
}

export default App
