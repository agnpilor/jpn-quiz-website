import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizResults from "./components/QuizResults";
import QuizList from "./components/QuizList";
import QuizView from "./components/QuizView";
import About from "./components/About";
import Resources from "./components/Resources";
import Login from "./components/Login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizview/:chapterId" element={<QuizView />} />
        <Route path="/quizresults" element={<QuizResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
