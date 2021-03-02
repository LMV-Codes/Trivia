import {
  Container,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
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

export const Home: React.FC = () => {
  const classes = useStyles();
  const [dataRecieved, setDataRecieved] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState(false);
  const [data, setData] = useState<TriviaData[]>([]);
  const springProps = useSpring({
    from: { opacity: 1, translateX: 0 },
    to: { opacity: requestSent ? 0 : 1, translateX: requestSent ? -300 : 0 },
  });

  return (
    <Container className={classes.mainContainer}>
      {dataRecieved ? (
        <TriviaQuestions
          triviaData={data}
          setDataRecieved={setDataRecieved}
          dataRecieved={dataRecieved}
          setRequestSent={setRequestSent}
        />
      ) : (
        <animated.div style={springProps as any}>
          <div className={classes.form}>
            <Typography
              variant="overline"
              align="center"
              className={classes.title}
            >
              welcome to trivia maker
            </Typography>
            <Typography variant="body2" align="center">
              Make a trivia and test your knowledge
            </Typography>
            <TriviaParameterChoice
              setTriviaData={setData}
              setDataRecieved={setDataRecieved}
              setRequestSent={setRequestSent}
            />
          </div>
        </animated.div>
      )}
    </Container>
  );
};
