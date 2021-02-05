import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    navMain: {
      backgroundColor: "#601BA1",
    },
  })
);

export const Navbar: React.FC = ({}) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navMain}>
      <Toolbar>
        <Typography variant="h6">TV</Typography>
      </Toolbar>
    </AppBar>
  );
};
