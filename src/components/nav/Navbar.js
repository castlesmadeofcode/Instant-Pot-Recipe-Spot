import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const NavBar = (props) => {
  const manageLogout = () => {
    props.clearAsUser();
    props.history.push("/login");
  };

  return (
    <header>
      <h1 className="project-title">Instant Pot Recipe Spot</h1>

      <nav>
        <ul className="navlink-container">
          <li>
            <NavLink
              className="navlink"
              to="/recipes"
              activeStyle={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Recipes
            </NavLink>
          </li>

          <li>
            <NavLink
              className="navlink"
              to="/favorites"
              activeStyle={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Favorites
            </NavLink>
          </li>

          {!props.currentUser ? (
            <li>
              <NavLink
                className="navlink"
                to="/login"
                activeStyle={{
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <span className="navlink" onClick={manageLogout}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
