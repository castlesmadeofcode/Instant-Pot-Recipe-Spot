import React, { useState, useEffect } from "react";
import FavoriteCard from "./FavoriteCard";
import FavoriteManager from "../../modules/FavoriteManager";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "./../RecipeBook.css";

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

const FavoritesList = (props) => {
  const [favorites, setFavorites] = useState([]);

  const deleteFavorite = (id) => {
    FavoriteManager.delete(id).then(() => getAllFavorites());
  };

  const getAllFavorites = () => {
    const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
    return FavoriteManager.getAllFavoritesByRecipe().then(
      (favoritesFromDatabase) => {
        const userFavorites = favoritesFromDatabase.filter(
          (favorite) => favorite.userId === userNow
        );
        setFavorites(userFavorites.reverse());
      }
    );
  };

  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <>
      <section className="section-content"></section>
      <div className="container-cards">
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            deleteFavorite={deleteFavorite}
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
export default FavoritesList;
