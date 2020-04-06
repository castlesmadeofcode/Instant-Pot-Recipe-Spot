import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeManager from "../../modules/RecipeManager";
import FavoriteManager from "../../modules/FavoriteManager";
import "../RecipeBook.css";
import FilterRecipes from "./FilteredRecipes";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Instant Pot Recipe Spot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const RecipesList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const deleteRecipe = (id) => {
    RecipeManager.delete(id).then(() => {
      getAllRecipes();
    });
  };

  const getAllRecipes = () => {
    RecipeManager.getAllRecipesWithUsers().then((recipesFromAPI) => {
      setRecipes(recipesFromAPI.reverse());
      setFilteredRecipes(recipesFromAPI);
    });
  };

  const addFavorite = (id) => {
    const userId = JSON.parse(sessionStorage.getItem("userCredentials"));
    FavoriteManager.post({ recipeId: id, userId: userId }).then(() => {
      getAllRecipes();
    });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <FilterRecipes
        recipes={recipes}
        filteredRecipes={filteredRecipes}
        setFilteredRecipes={setFilteredRecipes}
      />

      <section className="section-content">
        {props.currentUser ? (
          <button
            type="button"
            className="btn"
            onClick={() => {
              props.history.push("/recipes/new");
            }}
          >
            <AddIcon fontSize="small"></AddIcon>
          </button>
        ) : (
          <p>
            <em></em>
          </p>
        )}
      </section>
      <div className="container-cards">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            deleteRecipe={deleteRecipe}
            addFavorite={addFavorite}
            {...props}
          />
        ))}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </>
  );
};
export default RecipesList;
