import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { TriviaData } from "../pages/Home";
import {
  Button,
  createStyles,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "../index.css";

interface TriviaQuestionsProps {
  triviaData: TriviaData[];
  setDataRecieved: Function;
}

const useStyles = makeStyles(() =>
  createStyles({
    triviaForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: " space-evenly",
    },
    submitButton: {
      fontSize: "1.2em",
      alignSelf: "center",
      marginTop: "1em",
      width: "10em",
      color: "white",
      borderRadius: "5px",
      backgroundColor: "#8A20ED",
      "&:hover": {
        backgroundColor: "#601BA1",
      },
    },
    answersBlock: {
      marginTop: "1.5em",
      marginBottom: "1.5em",
      "& input[type=radio]": {
        opacity: "0",
        position: "fixed",
        width: "0",
      },
      "& label": {
        color: "#601BA1",
        display: "inline-block",
        border: "0.1em solid #8A20ED",
        backgroundColor: "#FFFFFF",
        padding: "10px 20px",
        fontFamily: "Karla, sans-serif",
        fontSize: "16px",
        borderRadius: "5px",
        transition: "all 0.3s",
      },
      "& input[type=radio]:checked + label": {
        color: "white",
        backgroundColor: "#601BA1",
      },

      "& label:hover": {
        color: "white",
        backgroundColor: "#601BA1",
        cursor: "pointer",
      },
    },
    questionTypography: {
      fontFamily: "Rubik, sans-serif",
      fontWeight: 400,
    },
  })
);
export const TriviaQuestions: React.FC<TriviaQuestionsProps> = ({
  triviaData,
  setDataRecieved,
}) => {
  const classes = useStyles();
  const [corrected, setCorrected] = useState(false);
  const [correctOrWrong, setCorrectOrWrong] = useState<boolean[]>([]);
  const joinAndSort = (
    incorrectAnswers: Array<string>,
    correctAnswer: string
  ) => {
    let allAnswers: Array<string> = [...incorrectAnswers, correctAnswer];
    return allAnswers.sort();
  };

  return (
    <Formik
      initialValues={{
        questions: [],
      }}
      onSubmit={(values) => {
        const answersArray: Array<boolean> = [];
        const testAnswers = (data: TriviaData[]) => {
          for (let i = 0; i < 10; i++) {
            if (values.questions[i] === data[i].correct_answer) {
              answersArray.push(true);
            } else {
              answersArray.push(false);
            }
            setCorrectOrWrong(answersArray);
          }
        };
        console.log(correctOrWrong);
        console.log(values);
        testAnswers(triviaData);
        setCorrected(true);
      }}
    >
      <Form className={classes.triviaForm}>
        {triviaData.map((data, indexQuestion) => (
          <div key={indexQuestion}>
            <Typography variant="h6" className={classes.questionTypography}>
              {atob(data.question)}
            </Typography>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="baseline"
              spacing={1}
            >
              {joinAndSort(data.incorrect_answers, data.correct_answer).map(
                (answer, indexAnswer) => (
                  <div
                    role="group"
                    aria-labelledby="radioGroup"
                    key={indexAnswer}
                    className={classes.answersBlock}
                  >
                    <Grid item xs key={indexAnswer}>
                      <Field
                        disabled={corrected ? true : false}
                        type="radio"
                        value={answer}
                        name={`questions.${indexQuestion}`}
                        key={indexAnswer}
                        id={`${answer}${indexQuestion}`}
                      />
                      <label htmlFor={`${answer}${indexQuestion}`}>
                        {atob(answer)}
                      </label>
                    </Grid>
                  </div>
                )
              )}
            </Grid>

            {!corrected
              ? null
              : [
                  correctOrWrong[indexQuestion] ? (
                    <Alert severity="success">
                      {atob(data.correct_answer)} is the correct answer!
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      Wrong, the correct answer was {atob(data.correct_answer)}
                    </Alert>
                  ),
                ]}
          </div>
        ))}
        {!corrected ? (
          <Button type="submit" className={classes.submitButton}>
            Submit
          </Button>
        ) : (
          <Button
            className={classes.submitButton}
            onClick={() => setDataRecieved(false)}
          >
            Generate new trivia
          </Button>
        )}
      </Form>
    </Formik>
  );
};
