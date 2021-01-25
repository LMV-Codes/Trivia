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

interface TriviaQuestionsProps {
  triviaData: TriviaData[];
  setDataRecieved: Function;
}

const useStyles = makeStyles(() =>
  createStyles({
    triviaForm: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: " center",
    },
    submitButton: {
      marginTop: "1em",
      width: "15em",
      color: "white",
      borderRadius: "4em",
      backgroundColor: "#8A20ED",
      "&:hover": {
        backgroundColor: "#601BA1",
      },
    },
    answersBlock: {
      marginTop: "1.5em",
      marginBottom: "1.5em",
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
  const combineAndRandomizeAnswers = (
    incorrectAnswers: Array<string>,
    correctAnswer: string
  ) => {
    let allAnswers: Array<string> = [...incorrectAnswers, correctAnswer];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
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
            <Typography variant="overline">{atob(data.question)}</Typography>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              {combineAndRandomizeAnswers(
                data.incorrect_answers,
                data.correct_answer
              ).map((answer, indexAnswer) => (
                <div
                  role="group"
                  aria-labelledby="radioGroup"
                  key={indexAnswer}
                  className={classes.answersBlock}
                >
                  <Typography variant="subtitle2">
                    <Grid item xs>
                      <Field
                        disabled={corrected ? true : false}
                        type="radio"
                        value={answer}
                        name={`questions.${indexQuestion}`}
                        key={indexAnswer}
                      />
                      {atob(answer)}
                    </Grid>
                  </Typography>
                </div>
              ))}
            </Grid>

            {!corrected
              ? null
              : [
                  correctOrWrong[indexQuestion] ? (
                    <Alert severity="success">Correct answer!</Alert>
                  ) : (
                    <Alert severity="error">
                      Wrong, the correct answer was {data.correct_answer}
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
            Generate new quizz
          </Button>
        )}
      </Form>
    </Formik>
  );
};
