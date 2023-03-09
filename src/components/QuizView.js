import "../styles/App.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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

  return (
    <div className="fill-in-the-blank">
      <h1>Fill in the Blank Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="question-container">
          <p>
            Question {currentQuestion + 1}:{" "}
            {questions[currentQuestion]?.question}
          </p>
          <input
            type="text"
            name="answer"
            value={userAnswers[currentQuestion] || ""}
            onChange={handleInputChange}
          />
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
  );
};

export default QuizView;
