import React from "react";

const RecipeCard = props => {
  return (
    <div className="cards">
      <section className="cards-content">
        <picture></picture>
        <h3>
          Name: <span className="">{props.recipe.name}</span>
        </h3>
        <h3>Description: {props.recipe.description}</h3>
        <h3>Instructions: {props.recipe.instructions}</h3>
        <button
          type="button"
          onClick={() => props.history.push(`/recipes/${props.recipe.id}/edit`)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => props.deleteRecipe(props.recipe.id)}
        >
          Discharge
        </button>
      </section>
    </div>
  );
};

export default RecipeCard;
