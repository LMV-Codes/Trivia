import React from "react";

interface QuestionRandomizerProps {
  incorrectAnswers: Array<string>;
  correctAnswer: string;
}

export const QuestionRandomizer: React.FC<QuestionRandomizerProps> = ({
  incorrectAnswers,
  correctAnswer,
}) => {
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
    <div>
      {combineAndRandomizeAnswers(incorrectAnswers, correctAnswer).map(
        (answers) => answers
      )}
      ;
    </div>
  );
};
