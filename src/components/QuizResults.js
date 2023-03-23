import "../styles/QuizResults.css";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "./Footer";
import Navbar from "./Navbar";

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const fetchQuizResults = async () => {
      const querySnapshot = await getDocs(collection(db, "quizResults"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setQuizResults(data);
    };
    fetchQuizResults();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="quiz-results">
      <h1>Quiz Results</h1>
      <table>
          
          {/* need to implement a better way to show scores? with the graph line ? privacy issues */}
        <tbody>
          {quizResults.map((result, index) => (
            <tr key={index}>
              <td>{result.userName}</td>
              <td>{result.score}/{result.totalQuestions}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Footer/>
      </div>
  );
};

export default QuizResults;
