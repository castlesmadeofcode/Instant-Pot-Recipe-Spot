import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeManager from "../../modules/RecipeManager";
import "./../RecipeBook.css";

const RecipesList = props => {
  const [recipes, setRecipes] = useState([]);

  const deleteRecipe = id => {
    RecipeManager.delete(id).then(() => getAllRecipes());
  };

  //   const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

  // const getAllRecipes = () => {
  //   return RecipeManager.getAllRecipesByUser().then(recipesFromDatabase => {
  //     const userRecipes = recipesFromDatabase.filter(
  //       recipe => recipe.user.id === userNow
  //     );
  //     setRecipes(userRecipes.reverse());
  //   });
  // };

  const getAllRecipes = () => {
    return RecipeManager.getAll().then(recipesFromAPI => {
      setRecipes(recipesFromAPI.reverse());
    });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <section className="section-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            props.history.push("/recipes/new");
          }}
        >
          New Recipe
        </button>
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
