import {
  Container,
  createStyles,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { Formik, Form, Field, FieldProps } from "formik";
import React, { useState } from "react";
import { QuestionRandomizer } from "../components/QuestionRandomizer";
import { TriviaParameterChoice } from "../components/TriviaParameterChoice";
import { TriviaQuestions } from "../components/TriviaQuestions";

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
    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

export interface TriviaData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

export const Home: React.FC = ({}) => {
  const classes = useStyles();
  const [dataRecieved, setDataRecieved] = useState<boolean>(false);
  const [data, setData] = useState<TriviaData[]>([]);

  return (
    <Container className={classes.mainContainer}>
      {dataRecieved === false ? (
        <div className={classes.form}>
          <Typography
            variant="overline"
            align="center"
            className={classes.title}
          >
            welcome to trivianator
          </Typography>
          <Typography variant="body2" align="center">
            Generate a trivia and test your knowledge
          </Typography>
        </div>
      ) : null}

      {dataRecieved === false ? (
        <div>
          <TriviaParameterChoice
            setTriviaData={setData}
            setDataRecieved={setDataRecieved}
          />
        </div>
      ) : (
        <TriviaQuestions triviaData={data} setDataRecieved={setDataRecieved} />
      )}
    </Container>
  );
};
