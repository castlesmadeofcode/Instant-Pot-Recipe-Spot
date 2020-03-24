import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RecipeManager from "../../modules/RecipeManager";
import "./../RecipeBook.css";

const RecipeDetail = props => {
  let history = useHistory();
  const [recipe, setRecipe] = useState({
    name: "",
    instructions: "",
    ingredients: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    RecipeManager.get(props.recipeId).then(recipe => {
      setRecipe({
        name: recipe.name,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients
      });
      setIsLoading(false);
    });
  }, [props.recipeId]);

  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span style={{ color: "darkslategrey" }}>{recipe.name}</span>
        </h3>
        <p>Instructions: {recipe.instructions}</p>
        <p>ingredients: {recipe.ingredients}</p>
        <button onClick={() => history.goBack()}>Back</button>
      </div>
    </div>
  );
};

export default RecipeDetail;
