import React from "react";

const RecipeCard = props => {
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
        <h3>Instructions: {props.recipe.instructions}</h3>
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
      </section>
    </div>
  );
};

export default RecipeCard;
