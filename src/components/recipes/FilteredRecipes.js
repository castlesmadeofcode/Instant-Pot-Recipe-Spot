import React, { useState, useEffect } from "react";

function FilterRecipes(props) {
  const [searchTerm, setSearchTerm] = useState([]);
  const handleChange = event => {
    const input = event.target.value;
    setSearchTerm(input);
    const updatedRecipes = props.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(input.toLowerCase());
    });
    props.setFilteredRecipes(updatedRecipes);
  };

  return (
    <div className="FilterRecipes">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default FilterRecipes;
