


type RecipeCardProps = {
    title: string;
    image: string;
    have: string[];
    need: string[];
    tag: string;
    tagColor?: string;
    time: number
}

const RecipeCard = ({title, image, have, need, tag, tagColor, time}: RecipeCardProps) => {

  return (

    <>
    <div className="recipe-card-container">
        <div className="recipe-card">
        <h1>{title}</h1>
        
        <img src={image} alt="food picture" />
        
        <div className="tag-container">
            <div className="have-need-container">
                <p><span className="have">You Have:</span> {have.join(",  ")}</p>
                <p><span className="need">You Need:</span> {need.join(", ")}</p>
            </div>
            
            <div className="cooking-time">
                <span className="tag" style={{background: tagColor}}>{tag}</span>
                <span>Cooking Time:{time}</span>
            </div>
            
        </div>

        <button className="show-button">Show Instructions</button>
    </div>
    </div>
    </>
   
)
}

export default RecipeCard