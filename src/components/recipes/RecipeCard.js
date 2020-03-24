import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteManager from "../../modules/FavoriteManager";
const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

const RecipeCard = props => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    isFavorited(props.recipe.id, userNow);
  });

  const isFavorited = (recipeId, userId) => {
    FavoriteManager.getFavoriteByRecipeId(recipeId).then(favoritesFromAPI => {
      const findUser = favoritesFromAPI.some(item => item.userId === userId);

      if (findUser) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    });
  };

  const IsLoggedIn = () => {
    const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (userNow !== null) {
      return true;
    } else {
      return false;
    }
  };
  const EditAndDeletePermission = recipe => {
    const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (recipe.userId === userNow) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="cards">
      <section className="cards-content">
        <picture></picture>
        <h3>
          Name: <span className="">{props.recipe.name}</span>
        </h3>
        <h3>Description: {props.recipe.description}</h3>
        <Link to={`/recipes/${props.recipe.id}`}>
          <button>Details</button>
        </Link>
        {EditAndDeletePermission(props.recipe) ? (
          <button
            type="button"
            onClick={() =>
              props.history.push(`/recipes/${props.recipe.id}/edit`)
            }
          >
            Edit
          </button>
        ) : null}
        {EditAndDeletePermission(props.recipe) ? (
          <button
            type="button"
            onClick={() => props.deleteRecipe(props.recipe.id)}
          >
            Delete
          </button>
        ) : null}
        {IsLoggedIn(props.recipe) && !isFavorite ? (
          <button
            type="button"
            onClick={() => props.addFavorite(props.recipe.id, userNow)}
          >
            Favorite
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default RecipeCard;
