import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    footerMain: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#601BA1",
    },
    gitHubLink: {
      textDecoration: "none",
      color: "white",
    },
  })
);

export const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.footerMain}>
      <Toolbar>
        <Typography variant="body1" align="center">
          <a className={classes.gitHubLink} href="https://github.com/LMV-Codes">
            Made by LMV-Codes
          </a>
          &#xA0;using Opentdb
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
