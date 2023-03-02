import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FillInTheBlankQuiz from "./components/FillInTheBlankQuiz";
import QuizResults from "./components/QuizResults";
import QuizList from "./components/QuizList";
import QuizView from "./components/QuizView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/quizview/:quizId" component={QuizView} />
        <Route path="/quizresults/:quizId" component={QuizResults} />
      </Routes>
    </Router>
  );
}

export default App;
