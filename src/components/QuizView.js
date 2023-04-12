import "../styles/QuizView.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactMarkdown from 'react-markdown';

const QuizView = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchQuestions = async () => {
    const quizDoc = doc(db, "quizlist", "quiz", "Chapters", chapterId);
    const quizDocData = await getDoc(quizDoc);
    setTitle(quizDocData.id);
    const querySnapshot = await getDocs(
      collection(db, "quizlist", "quiz", "Chapters", chapterId, "questions")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setQuestions(data);
  
    if (data[currentQuestion]?.imageUrl) {
      setImageUrl(data[currentQuestion]?.imageUrl);
    } else {
      setImageUrl('');
    }
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
  
  // const components = {
  //   strong: (props) => <strong style={{ color: "red" }}>{props.children}</strong>,
  // };
  return (
    <div>
      <Navbar />
      <div className="quiz-container">
        <h1>{title}</h1>
        {imageUrl && <img src={imageUrl} alt="Question" />}
        <form onSubmit={handleSubmit}>
          <div className="question-container">
            <p>
              <strong>Question {currentQuestion + 1}:{" "}</strong>
              <ReactMarkdown>
                {questions[currentQuestion]?.question.toString().replace(",", "")}
              </ReactMarkdown>
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
