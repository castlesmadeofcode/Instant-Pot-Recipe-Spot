import React, { useState } from "react";
import RecipeManager from "../../modules/RecipeManager";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

const AddRecipeForm = (props) => {
  const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    ingredients: "",
    img: "",
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

  const constructNewRecipe = (evt) => {
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
          <div className={classes.root}>
            <div className="formgrid">
              <TextField
                onChange={handleFieldChange}
                id="name"
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
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  onClick={constructNewRecipe}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AddRecipeForm;
