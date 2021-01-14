import {
  Container,
  createStyles,
  InputLabel,
  makeStyles,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import axios from "axios";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import React, { useState } from "react";

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
    itemField: {
      width: "20rem",
    },
    formDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "1em",
    },
    submitButton: {
      width: "15em",
      color: "white",
      borderRadius: "4em",
      backgroundColor: "#8A20ED",
      "&:hover": {
        backgroundColor: "#601BA1",
      },
    },
    formLabel: {
      marginBottom: "1em",
    },
  })
);

interface PostForm {
  numberOfQuestions: number;
  category: number | string;
  difficulty: string;
  type: string;
}

export const Home: React.FC = ({}) => {
  const initialValues: PostForm = {
    numberOfQuestions: 10,
    category: "any",
    difficulty: "easy",
    type: "any",
  };
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer}>
      <Typography variant="overline" align="center" className={classes.title}>
        welcome to trivianator
      </Typography>
      <Typography variant="body2" align="center">
        Generate a trivia and test your knowledge
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const getData = async () => {
            try {
              const response = await axios.get(
                `https://opentdb.com/api.php?amount=10&category=${values.category}&difficulty=${values.difficulty}&type=${values.type}`
              );
              console.log(response);
              return response;
            } catch (error) {
              throw error;
            }
          };
          console.log({ values, actions });
          actions.setSubmitting(false);
          getData();
        }}
      >
        <Form className={classes.form}>
          <div className={classes.formDiv}>
            <InputLabel htmlFor="category" className={classes.formLabel}>
              Category
            </InputLabel>
            <Field as={Select} name="category" className={classes.itemField}>
              <MenuItem value="any">Any Category</MenuItem>
              <MenuItem value={9}>General Knowledge</MenuItem>
              <MenuItem value={10}>Entertainment: Books</MenuItem>
              <MenuItem value={11}>Entertainment: Film</MenuItem>
              <MenuItem value={12}>Entertainment: Music</MenuItem>
              <MenuItem value={13}>Entertainment: Musicals & Theatres</MenuItem>
              <MenuItem value={14}>Entertainment: Television</MenuItem>
              <MenuItem value={15}>Entertainment: Video Games</MenuItem>
              <MenuItem value={16}>Entertainment: Board Games</MenuItem>
              <MenuItem value={17}>Science & Nature</MenuItem>
              <MenuItem value={18}>Science: Computers</MenuItem>
              <MenuItem value={19}>Science: Mathematics</MenuItem>
              <MenuItem value={20}>Mythology</MenuItem>
              <MenuItem value={21}>Sports</MenuItem>
              <MenuItem value={22}>Geography</MenuItem>
              <MenuItem value={23}>History</MenuItem>
              <MenuItem value={24}>Politics</MenuItem>
              <MenuItem value={25}>Art</MenuItem>
              <MenuItem value={26}>Celebrities</MenuItem>
              <MenuItem value={27}>Animals</MenuItem>
              <MenuItem value={28}>Vehicles</MenuItem>
              <MenuItem value={29}>Entertainment: Comics</MenuItem>
              <MenuItem value={30}>Science: Gadgets</MenuItem>
              <MenuItem value={31}>
                Entertainment: Japanese Anime & Manga
              </MenuItem>
              <MenuItem value={32}>
                Entertainment: Cartoon & Animations
              </MenuItem>
            </Field>
          </div>
          <div className={classes.formDiv}>
            <InputLabel htmlFor="difficulty" className={classes.formLabel}>
              Difficulty
            </InputLabel>
            <Field as={Select} name="difficulty" className={classes.itemField}>
              <MenuItem value="any">Any Difficulty</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Field>
          </div>
          <div className={classes.formDiv}>
            <InputLabel htmlFor="Type" className={classes.formLabel}>
              Type
            </InputLabel>
            <Field as={Select} name="type" className={classes.itemField}>
              <MenuItem value="any">Any Type</MenuItem>
              <MenuItem value="multiple">Multiple Choice</MenuItem>
              <MenuItem value="boolean">True / False</MenuItem>
            </Field>
          </div>
          <Button type="submit" className={classes.submitButton}>
            Generate Trivia
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};
