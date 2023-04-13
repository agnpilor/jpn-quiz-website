import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/QuizResults.css";
import Navbar from './Navbar';
import Footer from './Footer';
import ReactMarkdown from 'react-markdown';

const QuizResults = () => {
  const location = useLocation();
  const { score, totalQuestions, userAnswers, questions } = location.state;

  const renderResults = (question, index) => {
    const isCorrect = userAnswers[index] === question.correctAnswer;
    return (
      <div key={index} className={isCorrect ? "correct" : "incorrect"}>
        
        <p className="quizresult-question">
          {isCorrect ? "✅" : "❌"} <span className="quizresults-label">Question {index + 1}:</span>{" "}
          <ReactMarkdown>{question.question}</ReactMarkdown>
        </p>
        <p className="question-question">
          <span className="quizresults-label">Your answer: </span>{userAnswers[index]} <br/> 
          <span className="quizresults-label">Correct answer:{" "}</span>
          {question.correctAnswer}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="quizresults-container">
        <h1>Quiz Results:</h1>
        <h2>Your Score: {score}/{totalQuestions}</h2>
        <div className="results-container">
      <h3>Review:</h3>
        <div className="result-map">
          {questions.map(renderResults)}</div>
        </div>
        </div>
<Footer/>
    </div>
  );
};

export default QuizResults;