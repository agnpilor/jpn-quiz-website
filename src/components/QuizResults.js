import "../styles/App.css";
import React from "react";
import { useLocation } from "react-router-dom";

const QuizResults = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state;

  return (
    <div className="quiz-results">
      <h1>Quiz Results</h1>
      <p>
        You scored {score} out of {totalQuestions}!
      </p>
    </div>
  );
};

export default QuizResults;
