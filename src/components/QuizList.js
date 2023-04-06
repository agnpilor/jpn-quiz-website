import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../styles/QuizList.css";

const QuizList = () => {
  const [chapterList, setChapterList] = useState([]);

  useEffect(() => {
    const getChapterList = async () => {
      const chapterRef = collection(db, "quizlist", "quiz", "Chapters");
      const chapterQuery = query(chapterRef);
      const snapshot = await getDocs(chapterQuery);
      const chapterData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChapterList(chapterData);
    };
    getChapterList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="quizlist-body">
        <h1>Quiz List:</h1>
        <ul>
          {chapterList.map((chapter) => (
            <li key={chapter.id}>
              <Link to={`/quizview/${chapter.id}`}>{chapter.id}</Link>
              <div className="description">{chapter.description}</div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default QuizList;
