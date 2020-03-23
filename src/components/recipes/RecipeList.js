import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeManager from "../../modules/RecipeManager";
import "./../RecipeBook.css";

const RecipesList = props => {
  const [recipes, setRecipes] = useState([]);

  const deleteRecipe = id => {
    RecipeManager.delete(id).then(() => getAllRecipes());
  };

  const getAllRecipes = () => {
    return RecipeManager.getAllRecipesByUser().then(recipesFromAPI => {
      setRecipes(recipesFromAPI.reverse());
    });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <section className="section-content">
        {props.currentUser ? (
          <button
            type="button"
            className="btn"
            onClick={() => {
              props.history.push("/recipes/new");
            }}
          >
            New Recipe
          </button>
        ) : (
          <p>
            <em></em>
          </p>
        )}
      </section>
      <div className="containers-cards">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            deleteRecipe={deleteRecipe}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default RecipesList;
