import "../App.css";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { Link } from "react-router-dom";

function QuizList() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "quizlist", "quiz", "Chapters"));
      const querySnapshot = await getDocs(q);
      setChapters(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Japanese Quiz</h1>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link to={`/quizview/${chapter.id}`}>{chapter.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
