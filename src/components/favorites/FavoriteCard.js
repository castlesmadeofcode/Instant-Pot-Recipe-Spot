import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "../recipes/Recipe.css";

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

const FavoriteCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="cards">
      <section className="cards-content">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.favorite.recipe.url}
              title="Recipe Pic"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <span className="">{props.favorite.recipe.name}</span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.favorite.recipe.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Link to={`/recipes/${props.favorite.recipe.id}`}>
              <Button size="small" color="">
                Details
              </Button>
            </Link> */}
            <IconButton
              size="small"
              color=""
              type="button"
              onClick={() => {
                props.deleteFavorite(props.favorite.id);
              }}
            >
              <DeleteIcon />
            </IconButton>

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
                <span className="">{props.favorite.recipe.ingredients}</span>
              </Typography>
              <Typography paragraph>
                <b>Instructions:</b>
              </Typography>

              <Typography paragraph>
                <span className="">{props.favorite.recipe.instructions}</span>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </section>
    </div>
  );
};

export default FavoriteCard;
