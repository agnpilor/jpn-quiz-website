import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../styles/QuizView.css";

const QuizView = () => {
  const [questions, setQuestions] = useState([]);
  const { quizId } = useParams();

  useEffect(() => {
    const getQuestions = async () => {
      const questionsRef = collection(
        db,
        "Categories",
        category,
        "quizlist",
        quizId,
        "questions"
      );
      const snapshot = await getDocs(questionsRef);
      const questionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setQuestions(questionsData);
    };
  
    getQuestions();
  }, [category, quizId]);
  

  return (
    <div>
      <Navbar />
      <div className="quizview-body">
        <h1>Quiz Questions:</h1>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <p>{question.question}</p>
              <p>Correct Answer: {question.correctAnswer}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default QuizView;
