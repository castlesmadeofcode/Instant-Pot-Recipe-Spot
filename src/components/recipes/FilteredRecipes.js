import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function FilterRecipes(props) {
  const [searchTerm, setSearchTerm] = useState([]);
  const classes = useStyles();
  const handleChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    const updatedRecipes = props.recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(input.toLowerCase());
    });
    props.setFilteredRecipes(updatedRecipes);
  };

  return (
    <div className="FilterRecipes">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Search"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default FilterRecipes;
