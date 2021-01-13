import {
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    mainContainer: {
      minHeight: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      paddingBottom: "2em",
    },
    title: {
      fontSize: "2em",
      letterSpacing: ".5em",
      fontWeight: "lighter",
    },
  })
);

export const Home: React.FC = ({}) => {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer}>
      <Typography variant="overline" align="center" className={classes.title}>
        welcome to trivianator
      </Typography>
      <Typography variant="body2" align="center">
        Generate a trivia and test your knowledge
      </Typography>
    </Container>
  );
};
