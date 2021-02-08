import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TriviaData } from "../pages/Home";
import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "../index.css";
import { useSpring, animated, useTrail } from "react-spring";
import { Answers } from "./Answers";
import { MainTrail } from "./MainTrail";

interface TriviaQuestionsProps {
  triviaData: TriviaData[];
  setDataRecieved: Function;
  setRequestSent: Function;
  dataRecieved: boolean;
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
    questionTypography: {
      fontFamily: "Rubik, sans-serif",
      fontWeight: 400,
    },
  })
);
export const TriviaQuestions: React.FC<TriviaQuestionsProps> = ({
  triviaData,
  setDataRecieved,
  setRequestSent,
  dataRecieved,
}) => {
  const classes = useStyles();
  const [corrected, setCorrected] = useState(false);
  const [correctOrWrong, setCorrectOrWrong] = useState<boolean[]>([]);

  const springProps = useSpring({
    from: { translateY: -50, opacity: 0 },
    to: { translateY: corrected ? 0 : -50, opacity: corrected ? 1 : 0 },
  });
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
      {/* <animated.div style={mainSpringProp as any}> */}
      <Form className={classes.triviaForm}>
        <MainTrail animateOn={dataRecieved}>
          {triviaData.map((data, indexQuestion) => (
            <div key={indexQuestion}>
              <Typography variant="h6" className={classes.questionTypography}>
                {atob(data.question)}
              </Typography>
              <Answers
                data={data}
                indexQuestion={indexQuestion}
                corrected={corrected}
              />
              <div>
                {corrected
                  ? [
                      correctOrWrong[indexQuestion] ? (
                        <animated.div style={springProps as any}>
                          <Alert severity="success">
                            {atob(data.correct_answer)} is the correct answer!
                          </Alert>
                        </animated.div>
                      ) : (
                        <animated.div style={springProps as any}>
                          <Alert severity="error">
                            Wrong, the correct answer was{" "}
                            {atob(data.correct_answer)}
                          </Alert>
                        </animated.div>
                      ),
                    ]
                  : null}
              </div>
            </div>
          ))}
        </MainTrail>

        {!corrected ? (
          <Button type="submit" className={classes.submitButton}>
            Submit
          </Button>
        ) : (
          <Button
            className={classes.submitButton}
            onClick={() => {
              setDataRecieved(false);
              setRequestSent(false);
            }}
          >
            Generate new trivia
          </Button>
        )}
      </Form>
    </Formik>
  );
};
