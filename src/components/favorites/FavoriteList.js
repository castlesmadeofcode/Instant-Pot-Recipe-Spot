import React, { useState, useEffect } from "react";
import FavoriteCard from "./FavoriteCard";
import FavoriteManager from "../../modules/FavoriteManager";
// import "./../FavoriteBook.css";

const FavoritesList = props => {
  const [favorites, setFavorites] = useState([]);

  const deleteFavorite = id => {
    FavoriteManager.delete(id).then(() => getAllFavorites());
  };

  //   const favoriteRecipes = () => {
  //     FavoriteManager.getAllFavoritesByRecipe().then(favorites => {
  //       console.log(favorites);
  //     });
  //   };
  //   favoriteRecipes();
  const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));

  const getAllFavorites = () => {
    return FavoriteManager.getAllFavoritesByRecipe().then(
      favoritesFromDatabase => {
        console.log(favoritesFromDatabase);
        const userFavorites = favoritesFromDatabase.filter(
          favorite => favorite.userId === userNow
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
      <div className="containers-cards">
        {favorites.map(favorite => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            deleteFavorite={deleteFavorite}
            // favoriteRecipes={favoriteRecipes}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default FavoritesList;
