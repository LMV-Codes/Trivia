import { Alert } from "@material-ui/lab";
import React from "react";
import { animated, useSpring } from "react-spring";

interface QuestionAlertProps {
  correctAnswer: string;
  rightOrWrong: boolean;
  corrected: boolean;
}

export const QuestionAlert: React.FC<QuestionAlertProps> = ({
  correctAnswer,
  rightOrWrong,
  corrected,
}) => {
  const springProps = useSpring({
    from: { translateY: -50, opacity: 0 },
    to: { translateY: corrected ? 0 : -50, opacity: corrected ? 1 : 0 },
  });
  return (
    <animated.div style={springProps as any}>
      {rightOrWrong === true ? (
        <Alert severity="success">
          {atob(correctAnswer)} is the correct answer!
        </Alert>
      ) : (
        <Alert severity="error">
          Sorry, the right answer was {atob(correctAnswer)}
        </Alert>
      )}
    </animated.div>
  );
};
