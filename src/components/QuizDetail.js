import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const QuizDetail = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);

  const fetchQuizData = async () => {
    const quizDocRef = doc(db, "quizlist", quizId);
    const quizDoc = await getDoc(quizDocRef);

    if (quizDoc.exists()) {
      setQuizData(quizDoc.data());
    } else {
      console.log("Quiz not found.");
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  return (
    <div>
      {quizData ? (
        <>
          <h1>{quizData.title}</h1>
          <p>{quizData.description}</p>
          <ul>
            {quizData.ch1.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
};

export default QuizDetail;
