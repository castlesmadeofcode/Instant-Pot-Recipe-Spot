import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import RecipeBook from "./components/RecipeBook";
ReactDOM.render(
  <Router>
    <RecipeBook />
  </Router>,
  document.getElementById("root")
);
