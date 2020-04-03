import React from "react";
import { Link } from "react-router-dom";

const FavoriteCard = props => {
  const EditAndDeletePermission = favorite => {
    const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (favorite.userId === userNow) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="cards">
      <section className="cards-content">
        <picture>
          <img src={props.favorite.recipe.url} alt="Recipe Pic" />
        </picture>
        <h3>
          name: <span className="">{props.favorite.recipe.name}</span>
        </h3>
        <h3>description: {props.favorite.recipe.description}</h3>
        <Link to={`/recipes/${props.favorite.recipe.id}`}>
          <button>Details</button>
        </Link>
        {EditAndDeletePermission(props.favorite) ? (
          <button
            type="button"
            onClick={() => props.deleteFavorite(props.favorite.id)}
          >
            Remove
          </button>
        ) : null}
      </section>
    </div>
  );
};

export default FavoriteCard;
