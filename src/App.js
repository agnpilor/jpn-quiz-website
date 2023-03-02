import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FillInTheBlankQuiz from "./components/FillInTheBlankQuiz";
import QuizResults from "./components/QuizResults";
import QuizList from "./components/QuizList";
import QuizDetail from "./components/QuizDetail"; // import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FillInTheBlankQuiz />} />
        <Route path="/quizresults" element={<QuizResults />} />
        <Route path="/quizlist" element={<QuizList />} />
      </Routes>
    </Router>
  );
}

export default App;
