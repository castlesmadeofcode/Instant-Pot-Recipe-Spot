const remoteURL = "http://localhost:8088";

export default {
  getFavoriteByRecipeId(id) {
    return fetch(`${remoteURL}/favorites?recipeId=${id}`).then(result =>
      result.json()
    );
  },
  getAllFavoritesByRecipe() {
    return fetch(`${remoteURL}/favorites?_expand=recipe`).then(result =>
      result.json()
    );
  },
  delete(id) {
    return fetch(`${remoteURL}/favorites/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  post(newFavorite) {
    return fetch(`${remoteURL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFavorite)
    }).then(data => data.json());
  }
};
