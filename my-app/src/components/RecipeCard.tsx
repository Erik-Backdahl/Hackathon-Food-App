


type RecipeCardProps = {
    title: string;
    image: string;
    have: string[];
    need: string[];
    tag: string;
    tagColor?: string;
}

const RecipeCard = ({title, image, have, need, tag, tagColor}: RecipeCardProps) => {

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
            
            <span className="tag" style={{background: tagColor}}>{tag}</span>
        </div>

        <button className="show-button">Show Instructions</button>
    </div>
    </div>
    </>
   
)
}

export default RecipeCard