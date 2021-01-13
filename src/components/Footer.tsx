import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    footerMain: {
      backgroundColor: "#8A20ED",
    },
  })
);

export const Footer: React.FC = ({}) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.footerMain}>
      <Toolbar>
        <Typography variant="h6">Quizzer</Typography>
      </Toolbar>
    </AppBar>
  );
};
