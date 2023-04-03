import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../styles/QuizList.css";

const QuizList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesRef = collection(db, "Categories");
      const snapshot = await getDocs(categoriesRef);
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        quizzes: [],
      }));
    

      for (const category of categoriesData) {
        const quizzesRef = collection(db, "Categories", category.id, "quizlist");
        const quizzesSnapshot = await getDocs(quizzesRef);
    
        quizzesSnapshot.forEach((quizDoc) => {
          const quizData = quizDoc.data();
          category.quizzes.push({
            id: quizDoc.id,
            name: quizData.name,
          });
        });
      }
    
      setCategories(categoriesData);
    };
    
    getCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="quizlist-body">
        <h1>Quiz List:</h1>
        {categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {category.quizzes.map((quiz) => (
                <li key={quiz.id}>
                  <Link to={`/quizview/${quiz.id}`}>{quiz.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default QuizList;
