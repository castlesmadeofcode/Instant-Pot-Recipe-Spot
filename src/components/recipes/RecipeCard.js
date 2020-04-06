import React, { useState, useEffect } from "react";
import FavoriteManager from "../../modules/FavoriteManager";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./Recipe.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RecipeCard = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    isFavorited(props.recipe.id);
  });

  const isFavorited = (recipeId) => {
    const userId = JSON.parse(sessionStorage.getItem("userCredentials"));
    FavoriteManager.getFavoriteByRecipeId(recipeId).then((favoritesFromAPI) => {
      const findUser = favoritesFromAPI.some((item) => item.userId === userId);

      if (findUser) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    });
  };

  const IsLoggedIn = () => {
    const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (userNow !== null) {
      return true;
    } else {
      return false;
    }
  };
  const EditAndDeletePermission = (recipe) => {
    const userNow = JSON.parse(sessionStorage.getItem("userCredentials"));
    if (recipe.userId === userNow) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="cards">
      <section className="cards-content">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.recipe.url}
              title="Recipe Pic"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <span className="">{props.recipe.name}</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.recipe.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Link to={`/recipes/${props.recipe.id}`}>
              <Button size="small" color="">
                Details
              </Button>
            </Link> */}
            {EditAndDeletePermission(props.recipe) ? (
              <IconButton
                size="small"
                color=""
                type="button"
                onClick={() =>
                  props.history.push(`/recipes/${props.recipe.id}/edit`)
                }
              >
                <EditIcon />
              </IconButton>
            ) : null}
            {EditAndDeletePermission(props.recipe) ? (
              <IconButton
                size="small"
                color=""
                type="button"
                onClick={() => props.deleteRecipe(props.recipe.id)}
              >
                <DeleteIcon />
              </IconButton>
            ) : null}
            {IsLoggedIn(props.recipe) && !isFavorite ? (
              <IconButton
                size="small"
                color="black"
                type="button"
                onClick={() => props.addFavorite(props.recipe.id)}
              >
                <FavoriteIcon />
              </IconButton>
            ) : null}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                <b>Ingredients:</b>
              </Typography>
              <Typography paragraph>
                <span className="">{props.recipe.ingredients}</span>
              </Typography>
              <Typography paragraph>
                <b>Instructions:</b>
              </Typography>

              <Typography paragraph>
                <span className="">{props.recipe.instructions}</span>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </section>
    </div>
  );
};

export default RecipeCard;
