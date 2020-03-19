import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";

const Login = props => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    username: ""
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...userCredentials };
    stateToChange[evt.target.id] = evt.target.value;
    setUserCredentials(stateToChange);
  };

  const handleLogin = e => {
    e.preventDefault();

    LoginManager.getUsers().then(userArray => {
      console.log(userArray);
      const user = userArray.find(
        el =>
          el.email === userCredentials.email &&
          el.username === userCredentials.username
      );

      if (user !== undefined) {
        props.setAsUser(user.id);
        props.history.push("/recipes");
      } else {
        alert("Invalid information! Try again or register an account");
      }
    });
  };

  const newUserRedirect = () => {
    props.history.push("/newuser");
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <h3>Sign in</h3>
          <div className="formgrid">
            <label htmlFor="inputEmail">Email: </label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="email"
              placeholder="Email address"
              required=""
              autoFocus=""
            />

            <label htmlFor="inputUsername">Username: </label>
            <input
              onChange={handleFieldChange}
              type="username"
              id="username"
              placeholder="Username"
              required=""
            />
          </div>
          <button type="submit">Log in</button>

          <button onClick={newUserRedirect}>Add a new user</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
