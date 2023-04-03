import React from "react";
import homebanner from "../images/home-banner.png";
import "../styles/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Home = () => {
  return (
    <div className="home-body">
      <Navbar />
      <div className="home-banner">
        <div className="home-banner-left">
          <img src={homebanner} alt="home banner" />
        </div>
        <div className="home-banner-right">
          <h1>Learn Japanese now!</h1>
          <p>
            Learn Japanese easily with our user-friendly website! Our lessons
            are based on the popular Genki I textbook, covering everything from
            basic grammar and vocabulary to advanced conversation skills. With
            interactive exercises and quizzes, you'll have plenty of
            opportunities to practice and improve your language abilities. Start
            exploring the fascinating world of Japanese language and culture
            today!
          </p>
        </div>
      </div>
      <div className="browse-quizzes">{/* <QuizSlider /> */}</div>
      <Footer />
    </div>
  );
};

export default Home;
