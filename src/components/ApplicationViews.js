import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import NewUserForm from "./auth/NewUserForm";
import RecipeList from "./recipes/RecipeList";
import AddRecipeForm from "./recipes/AddRecipeForm";
import EditRecipeForm from "./recipes/EditRecipeForm";

const ApplicationViews = props => {
  const currentUser = props.currentUser;
  const setAsUser = props.setAsUser;

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          return <Redirect to="/recipes" />;
        }}
      />
      <Route
        exact
        path="/login"
        render={props => {
          return <Login setAsUser={setAsUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/newuser"
        render={props => {
          return <NewUserForm setAsUser={setAsUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/recipes"
        render={props => {
          if (currentUser) {
            return <RecipeList currentUser={currentUser} {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/recipes/addrecipe"
        render={props => {
          if (currentUser) {
            return <AddRecipeForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/recipe/:recipeId(\d+)/edit"
        render={props => {
          if (currentUser) {
            return <EditRecipeForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
