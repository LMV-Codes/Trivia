import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { Field } from "formik";
import React from "react";
import { TriviaData } from "../pages/Home";
interface AnswersProps {
  data: TriviaData;
  corrected: boolean;
  indexQuestion: number;
}

const useStyles = makeStyles(() =>
  createStyles({
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
  })
);

export const Answers: React.FC<AnswersProps> = ({
  data,
  corrected,
  indexQuestion,
}) => {
  const classes = useStyles();
  const joinAndSort = (
    incorrectAnswers: Array<string>,
    correctAnswer: string
  ) => {
    let allAnswers: Array<string> = [...incorrectAnswers, correctAnswer];
    return allAnswers.sort();
  };
  return (
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
  );
};
