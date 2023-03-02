import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const QuizView = () => {
  const { quizId } = useParams(); // gets the quizId from the URL parameter
  const [questions, setQuestions] = useState([]);

  // fetches the questions from the questions collection based on the quizId
  const getQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, "questions", quizId));
    const questionsData = [];
    querySnapshot.forEach((doc) => {
      questionsData.push({
        id: doc.id,
        question: doc.data().question,
        correctAnswer: doc.data().correctAnswer,
      });
    });
    setQuestions(questionsData);
  };

  // fetches the questions when the component mounts
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      <h1>Quiz View</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          <p>Correct answer: {question.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizView;
