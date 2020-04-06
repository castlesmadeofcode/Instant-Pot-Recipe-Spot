import React, { useState } from "react";
import LoginManager from "../../modules/LoginManager";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Instant Pot Recipe Spot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewUserForm = (props) => {
  const [newUserInfo, setNewUserInfo] = useState({
    email: "",
    username: "",
  });
  const [isAvailable, setIsAvailable] = useState(false);

  const classes = useStyles();

  const handleFieldChange = (event) => {
    const stateToChange = { ...newUserInfo };
    stateToChange[event.target.id] = event.target.value;
    setNewUserInfo(stateToChange);
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    LoginManager.getUsers().then((arrayOfUsers) => {
      const filteredUsers = arrayOfUsers.filter(
        (element) => element.email === newUserInfo.email
      );

      if (filteredUsers.length !== 0) {
        window.alert("This is already a registered user!");
      } else {
        if (newUserInfo.email === "" || newUserInfo.username === "") {
          window.alert("You must have a valid email and username! No blanks!");
        } else {
          LoginManager.post(newUserInfo).then(() => {
            LoginManager.getUsers().then((userArray) => {
              const user = userArray.find(
                (el) =>
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
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  autoComplete="current-username"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              disabled={isAvailable}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* <fieldset>
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
      </fieldset> */}
    </form>
  );
};

export default NewUserForm;
