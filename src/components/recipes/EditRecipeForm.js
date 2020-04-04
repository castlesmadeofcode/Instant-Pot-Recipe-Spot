import React, { useState, useEffect } from "react";
import RecipeManager from "../../modules/RecipeManager";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const EditRecipeForm = (props) => {
  const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    ingredients: "",
    url: "",
    userId: userNow,
  });
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...recipe };
    stateToChange[evt.target.id] = evt.target.value;
    setRecipe(stateToChange);
  };

  const updateExistingRecipe = (evt) => {
    evt.preventDefault();

    const editedRecipe = {
      id: props.match.params.recipeId,
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      url: recipe.url,
      userId: userNow,
    };

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
      RecipeManager.update(editedRecipe).then(() =>
        props.history.push("/recipes")
      );
    }
  };

  useEffect(() => {
    RecipeManager.get(props.match.params.recipeId).then((recipe) => {
      const recipeToChange = { ...recipe };
      setRecipe(recipeToChange);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className={classes.root}>
            <div className="formgrid">
              <TextField
                onChange={handleFieldChange}
                id="name"
                value={recipe.name}
                label="Name"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                onChange={handleFieldChange}
                id="description"
                value={recipe.description}
                label="Description"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={handleFieldChange}
                id="instructions"
                value={recipe.instructions}
                label="Instructions"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={handleFieldChange}
                id="ingredients"
                value={recipe.ingredients}
                label="Ingredients"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={handleFieldChange}
                id="url"
                value={recipe.url}
                label="Url"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="alignRight">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={updateExistingRecipe}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EditRecipeForm;
