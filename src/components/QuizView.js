import "../styles/QuizView.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import Footer from "./Footer";
import Navbar from "./Navbar";

const QuizView = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");

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

  const fetchDescription = async () => {
    const docRef = doc(
      db,
      "quizlist",
      "quiz",
      "Chapters",
      chapterId,
      "description",
      "description"
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDescription(docSnap.data().descriptionText);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchDescription();
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
      const quizResults = {
        userName: userName,
        score: score,
        totalQuestions: questions.length,
      };
      addDoc(collection(db, "quizResults"), quizResults)
        .then(() => {
          navigate("/quizresults", {
            state: { score: score, totalQuestions: questions.length },
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
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

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  


  return (
    <div>
      <Navbar/>
    <div className="quizview-body">
      <h1>{description}</h1>
      <form onSubmit={handleSubmit}>
        <div className="name-container">
          <input type="text" name="name" value={userName} placeholder="Enter your name" onChange={handleNameChange} />
        </div>
        <div className="question-container">
          <p>
            <span className="question-number">Q{currentQuestion + 1}:{" "}</span>
            <span className="question">{questions[currentQuestion]?.question}</span>
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
            {currentQuestion === questions.length - 1 ? "Submit" : "Next Question"}
          </button>
        </div>
      </form>
      </div>
      <Footer/>
      </div>
  );  
};

export default QuizView;
