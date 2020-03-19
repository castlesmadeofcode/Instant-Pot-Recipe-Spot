import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";

const NewUserForm = props => {
  const [newUserInfo, setNewUserInfo] = useState({
    email: "",
    username: ""
  });
  const [isAvailable, setIsAvailable] = useState(false);

  const handleFieldChange = event => {
    const stateToChange = { ...newUserInfo };
    stateToChange[event.target.id] = event.target.value;
    setNewUserInfo(stateToChange);
  };

  const handleRegistration = event => {
    event.preventDefault();

    LoginManager.getUsers().then(arrayOfUsers => {
      const filteredUsers = arrayOfUsers.filter(
        element => element.email === newUserInfo.email
      );

      if (filteredUsers.length !== 0) {
        window.alert("This is already a registered user!");
      } else {
        if (newUserInfo.email === "" || newUserInfo.username === "") {
          window.alert("You must have a valid email and username! No blanks!");
        } else {
          LoginManager.post(newUserInfo).then(() => {
            LoginManager.getUsers().then(userArray => {
              const user = userArray.find(
                el =>
                  el.email === newUserInfo.email &&
                  el.username === newUserInfo.username
              );
              props.setAsUser(user.id);
              setIsAvailable(false);
              props.history.push("/recipes");
            });
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleRegistration}>
      <fieldset>
        <h3>Add a New User</h3>
        <div className="formgrid">
          <label htmlFor="inputEmail">Email: </label>
          <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputUserName">Username: </label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="username"
            required=""
            autoFocus=""
          />
        </div>
        <button disabled={isAvailable} type="submit">
          Add User
        </button>
      </fieldset>
    </form>
  );
};

export default NewUserForm;
