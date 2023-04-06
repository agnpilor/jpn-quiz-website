import "../styles/QuizView.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";

const QuizView = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(
      collection(db, "quizlist", "quiz", "Chapters", chapterId, "questions")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [chapterId]);

  useEffect(() => {
    const correctAnswer = questions[currentQuestion]?.correctAnswer;
    const userAnswer = userAnswers[currentQuestion];
    if (
      userAnswer !== undefined &&
      userAnswer.toLowerCase() === correctAnswer.toLowerCase()
    ) {
      setScore(score + 1);
    }
  }, [userAnswers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/quizresults", {
        state: { score: score, totalQuestions: questions.length },
      });
    }
  };

  const handleInputChange = (e) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: e.target.value,
    });
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  // Render multiple choice UI if question has answer fields (answerA, answerB, etc.)
  const renderMultipleChoiceUI = () => {
    const currentQuestionData = questions[currentQuestion];
    const answerFields = ["answerA", "answerB", "answerC", "answerD"]; // Update with appropriate answer fields
    return (
      <div className="multiple-choice">
        <h2>Choose the correct answer:</h2>
        <ul>
          {answerFields.map((field, index) => (
            <li key={index}>
              <input
                type="radio"
                id={field}
                name="answer"
                value={field}
                checked={userAnswers[currentQuestion] === field}
                onChange={handleInputChange}
              />
              <label htmlFor={field}>x
                {currentQuestionData[field]}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="fill-in-the-blank">
        <h1>Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div className="question-container">
            <p>
              Question {currentQuestion + 1}:{" "}
              {questions[currentQuestion]?.question}
            </p>
            {questions[currentQuestion]?.answerA ? (
              <div>
                <input
                  type="radio"
                  id="answerA"
                  name="answer"
                  value="answerA"
                  checked={userAnswers[currentQuestion] === "answerA"}
                  onChange={handleInputChange}
                />
                <label htmlFor="answerA">
                  {questions[currentQuestion]?.answerA}
                </label>
                <br />
                <input
                  type="radio"
                  id="answerB"
                  name="answer"
                  value="answerB"
                  checked={userAnswers[currentQuestion] === "answerB"}
                  onChange={handleInputChange}
                />
                <label htmlFor="answerB">
                  {questions[currentQuestion]?.answerB}
                </label>
                <br />
                <input
                  type="radio"
                  id="answerC"
                  name="answer"
                  value="answerC"
                  checked={userAnswers[currentQuestion] === "answerC"}
                  onChange={handleInputChange}
                />
                <label htmlFor="answerC">
                  {questions[currentQuestion]?.answerC}
                </label>
                <br />
                <input
                  type="radio"
                  id="answerD"
                  name="answer"
                  value="answerD"
                  checked={userAnswers[currentQuestion] === "answerD"}
                  onChange={handleInputChange}
                />
                <label htmlFor="answerD">
                  {questions[currentQuestion]?.answerD}
                </label>
              </div>
            ) : (
              <input
                type="text"
                name="answer"
                value={userAnswers[currentQuestion] || ""}
                onChange={handleInputChange}
              />
            )}
          </div>
          <div className="button-container">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Prev Question
            </button>
            <button type="submit">
              {currentQuestion === questions.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}  

export default QuizView;
