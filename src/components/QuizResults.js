import "../styles/QuizResults.css";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

const QuizResults = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state;

  return (
    <div>
      <Navbar/>
    <div className="quiz-results">
      <h1>Quiz Results</h1>
      <p>
        You scored {score} out of {totalQuestions}!
      </p>
      </div>
      <Footer/>
      </div>
  );
};

export default QuizResults;
