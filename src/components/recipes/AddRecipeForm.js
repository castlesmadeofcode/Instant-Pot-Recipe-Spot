import React, { useState } from "react";
import RecipeManager from "../../modules/RecipeManager";

const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

const AddRecipeForm = props => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    ingredients: "",
    img: "",
    url: "",
    userId: userNow
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...recipe };
    stateToChange[evt.target.id] = evt.target.value;
    setRecipe(stateToChange);
  };

  const constructNewRecipe = evt => {
    evt.preventDefault();
    if (
      recipe.name === "" ||
      recipe.description === "" ||
      recipe.instructions === "" ||
      recipe.ingredients === "" ||
      recipe.url === "" ||
      recipe.userId === null
    ) {
      window.alert("Please login or fill out all the fields to continue");
    } else {
      setIsLoading(true);
      // Create the recipe and redirect user to recipe list
      RecipeManager.post(recipe).then(() => props.history.push("/recipes"));
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="name"
            />
            <label htmlFor="description">Description: </label>

            <input
              type="description"
              required
              onChange={handleFieldChange}
              id="description"
              placeholder="description"
            />
            <label htmlFor="instructions">Instructions: </label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="instructions"
              placeholder="instructions"
            />

            <label htmlFor="ingredients">Ingredients: </label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="ingredients"
              placeholder="ingredients"
            />

            <label htmlFor="url">Url: </label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="url"
              placeholder="url"
            />
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewRecipe}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AddRecipeForm;
