const remoteURL = "http://localhost:8088";

export default {
  getAllFavoritesByUser() {
    return fetch(`${remoteURL}/favorites?_expand=user`).then(result =>
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
  }
};
