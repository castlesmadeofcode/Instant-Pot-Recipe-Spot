import React, { useState, useEffect } from "react";
import RecipeManager from "../../modules/RecipeManager";

let recipes = [];

let getRecipeName = () => {
  RecipeManager.getAll().then(recipesFromApi => {
    recipesFromApi.forEach(recipe => {
      let recipeName = recipe.name;
      recipes.push(recipeName);
    });
  });
};
getRecipeName();

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? recipes
    : recipes.filter(recipe =>
        recipe.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  console.log(results);

  return (
    <div className="SearchForm">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {results.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;
