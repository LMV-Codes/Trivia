import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    navMain: {
      backgroundColor: "#601BA1",
    },
  })
);

export const Navbar: React.FC = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navMain}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={(e) => reloadPage()}>
          <Typography variant="h6">TM</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
