import "../styles/QuizView.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactMarkdown from 'react-markdown';
import Example from "./Examples"
import Modal from 'react-modal';


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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
  

  return (
    <div>
      <Navbar />
      <div className="quiz-container">
        <h1 className="quizview-title">{title}</h1>
        <p className="quizview-description">{description}</p>
        <Example/>
        <form onSubmit={handleSubmit}>
          <div className="question-container">
          <div>
      {imageUrl && (
        <div onClick={openModal}>
          <img src={imageUrl} className="question-image" alt="Image Question" />
        </div>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <img src={imageUrl} alt="Image Question" />
      </Modal>
    </div>
            <p><span className="question-number">Question {currentQuestion + 1}:{" "}</span></p>
            <p className="question">
{questions[currentQuestion]?.question && (
  <ReactMarkdown>
    {questions[currentQuestion].question
      .toString()
      .replace(",", "")}
  </ReactMarkdown>
)}
              </p>
              <div className="multiplechoice-answers">
            {questions[currentQuestion]?.answerA ? (
              <div className="question-answers">
  <input
    type="radio"
    id="answerA"
    name="answer"
    value="answerA"
    checked={userAnswers[currentQuestion] === "answerA"}
    onChange={handleInputChange}
    className="answer-radio"
  />
  <label htmlFor="answerA" className="answer-label">
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
    className="answer-radio"
  />
  <label htmlFor="answerB" className="answer-label">
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
    className="answer-radio"
  />
  <label htmlFor="answerC" className="answer-label">
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
    className="answer-radio"
  />
  <label htmlFor="answerD" className="answer-label">
    {questions[currentQuestion]?.answerD}
  </label>
</div>
            ) : (
              <input
                type="text"
                name="answer"
                className="answer-box"
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
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}  

export default QuizView;
