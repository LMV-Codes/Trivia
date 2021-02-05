import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import {
  Button,
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useSpring, animated } from "react-spring";

interface TriviaParameterChoiceProps {
  setTriviaData: Function;
  setDataRecieved: Function;
}
interface PostForm {
  numberOfQuestions: string;
  category: string;
  difficulty: string;
  type: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    itemField: {
      width: "20rem",
    },
    formDiv: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      margin: "1em",
    },
    submitButton: {
      marginTop: "1em",
      width: "15em",
      color: "white",
      borderRadius: "5px",
      backgroundColor: "#8A20ED",
      "&:hover": {
        backgroundColor: "#601BA1",
      },
    },
    formLabel: {
      marginBottom: "1em",
    },
    animationTest: {
      textAlign: "center",
      color: "white",
      borderRadius: "2em",
      backgroundColor: "#8A20ED",
      width: "4em",
      height: "2em",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#601BA1",
      },
    },
  })
);

export const TriviaParameterChoice: React.FC<TriviaParameterChoiceProps> = ({
  setTriviaData,
  setDataRecieved,
}) => {
  const classes = useStyles();
  const [animationRunning, setAnimationRunning] = useState(false);
  const { animation } = useSpring({
    from: { animation: 0 },
    animation: animationRunning ? 1 : 0,
    config: { duration: 500 },
  });

  const springProps = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });

  const initialValues: PostForm = {
    numberOfQuestions: "amount=10",
    category: "",
    difficulty: "",
    type: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `https://opentdb.com/api.php?${values.numberOfQuestions}&category=${values.category}${values.difficulty}${values.type}&encode=base64`
            );
            setTriviaData(response.data.results);
            console.log(response.data.results);
            setDataRecieved(true);
          } catch (error) {
            throw error;
          }
        };
        actions.setSubmitting(false);
        getData();
      }}
    >
      {({ values }) => (
        <Form className={classes.form}>
          <div className={classes.formDiv}>
            <InputLabel htmlFor="category" className={classes.formLabel}>
              Category
            </InputLabel>
            <Field
              as={Select}
              name="category"
              className={classes.itemField}
              displayEmpty
            >
              <MenuItem value="">Any Category</MenuItem>
              <MenuItem value="&category=9">General Knowledge</MenuItem>
              <MenuItem value="&category=10">Entertainment: Books</MenuItem>
              <MenuItem value="&category=11">Entertainment: Film</MenuItem>
              <MenuItem value="&category=12">Entertainment: Music</MenuItem>
              <MenuItem value="&category=13">
                Entertainment: Musicals & Theatres
              </MenuItem>
              <MenuItem value="&category=14">
                Entertainment: Television
              </MenuItem>
              <MenuItem value="&category=15">
                Entertainment: Video Games
              </MenuItem>
              <MenuItem value="&category=16">
                Entertainment: Board Games
              </MenuItem>
              <MenuItem value="&category=17">Science & Nature</MenuItem>
              <MenuItem value="&category=18">Science: Computers</MenuItem>
              <MenuItem value="&category=19">Science: Mathematics</MenuItem>
              <MenuItem value="&category=20">Mythology</MenuItem>
              <MenuItem value="&category=21">Sports</MenuItem>
              <MenuItem value="&category=22">Geography</MenuItem>
              <MenuItem value="&category=23">History</MenuItem>
              <MenuItem value="&category=24">Politics</MenuItem>
              <MenuItem value="&category=25">Art</MenuItem>
              <MenuItem value="&category=26">Celebrities</MenuItem>
              <MenuItem value="&category=27">Animals</MenuItem>
              <MenuItem value="&category=28">Vehicles</MenuItem>
              <MenuItem value="&category=29">Entertainment: Comics</MenuItem>
              <MenuItem value="&category=30">Science: Gadgets</MenuItem>
              <MenuItem value="&category=31">
                Entertainment: Japanese Anime & Manga
              </MenuItem>
              <MenuItem value="&category=32">
                Entertainment: Cartoon & Animations
              </MenuItem>
            </Field>
          </div>
          <div className={classes.formDiv}>
            <InputLabel htmlFor="difficulty" className={classes.formLabel}>
              Difficulty
            </InputLabel>
            <div>
              <Field
                as={Select}
                name="difficulty"
                className={classes.itemField}
                displayEmpty
              >
                <MenuItem value="">Any Difficulty</MenuItem>
                <MenuItem value="&difficulty=easy">Easy</MenuItem>
                <MenuItem value="&difficulty=medium">Medium</MenuItem>
                <MenuItem value="&difficulty=hard">Hard</MenuItem>
              </Field>
            </div>
          </div>
          <div className={classes.formDiv}>
            <InputLabel htmlFor="Type" className={classes.formLabel}>
              Type
            </InputLabel>
            <Field
              as={Select}
              name="type"
              className={classes.itemField}
              displayEmpty
            >
              <MenuItem value="">Any Type</MenuItem>
              <MenuItem value="&type=multiple">Multiple Choice</MenuItem>
              <MenuItem value="&type=boolean">True / False</MenuItem>
            </Field>
          </div>
          <div onClick={() => setAnimationRunning(!animationRunning)}></div>
          <Button type="submit" className={classes.submitButton}>
            Generate Trivia
          </Button>
          <animated.div style={springProps}>test</animated.div>
        </Form>
      )}
    </Formik>
  );
};
