import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FillInTheBlankQuiz from "./components/FillInTheBlankQuiz";
import QuizResults from "./components/QuizResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FillInTheBlankQuiz />} />
        <Route path="/quizresults" element={<QuizResults />} />
      </Routes>
    </Router>
  );
}

export default App;
