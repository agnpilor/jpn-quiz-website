import "../styles/QuizView.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactMarkdown from 'react-markdown';
import Example from "./Examples";

const QuizView = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchQuestions = async () => {
    const quizDoc = doc(db, "quizlist", "quiz", "Chapters", chapterId);
    const quizDocData = await getDoc(quizDoc);
    setTitle(quizDocData.id);
    setDescription(quizDocData.data().description);
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
        state: { score: score, totalQuestions: questions.length, userAnswers, questions },
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
        <h1 className="quizview-title">{title}</h1>
        <p className="quizview-description">{description}</p>
        <div className="quizview-examples">
          {Example}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="question-container">
          {imageUrl && <img src={imageUrl} className="question-image" alt="Image Question" />}
            <p><span className="question-number">Question {currentQuestion + 1}:{" "}</span></p>
            <p className="question">
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
          <div className="button-container">
            <button className="quiz-button"
              type="button"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button className="quiz-button" type="submit">
              {currentQuestion === questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}  

export default QuizView;
