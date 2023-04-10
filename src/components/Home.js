import React from "react";
import homebanner from "../images/home-banner.png";
import "../styles/Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import provision from "../images/provision.png"
import textbook from "../images/text-book.png"
import confetti from "../images/confetti.png"

const Home = () => {
  return (
    <div className="home-body">
      <Navbar />
      <div className="home-banner">
        <div className="home-banner-left">
          <h1>こんにちわ！</h1>
          <p>
          Discover the joy of learning Japanese with Kuizu! 
          Our quizzes are designed to make language learning engaging and easy, with questions 
          based on the Genki I textbook. Join us today and take your first step towards 
          mastering this beautiful language!
          </p>
          </div>
          <div className="home-banner-right">
            <img src={homebanner}/>
          </div>
      </div>
      <div className="kuizu-icons">
        <div className="kuizu-icon">
        <div className="kuizu-icon-bg">
          <img src={confetti} alt="Fun Icon" />
          </div>
          <h3>Fun and Interactive</h3>
          <p>Kuizu is designed to make learning Japanese engaging and enjoyable. 
            With a range of quizzes that are tailored to different levels of proficiency, 
            users can progress at their own pace and enjoy the process of learning.</p>
        </div>
        <div className="kuizu-icon">
        <div className="kuizu-icon-bg">
          <img src={textbook} alt="Textbook Icon" />
          </div>
          <h3>Based on the Genki I textbook</h3>
          <p>Our quizzes are based on the Genki I textbook, which is one of the most popular 
            textbooks for learning Japanese. By using quizzes that are aligned with this 
            textbook, users can reinforce their knowledge of grammar, vocabulary, and kanji.</p>
        </div>
        <div className="kuizu-icon">
        <div className="kuizu-icon-bg">
          <img src={provision} alt="Flexible Icon" />
          </div>
          <h3>Flexible and Accesible</h3>
          <p>Kuizu is accessible to users around the world and can be used on a range of 
            devices. With a flexible format that allows users to access quizzes at any time, our 
            website offers a convenient and effective way to learn Japanese at their own pace.</p>
        </div>
        </div>
      <Footer />
    </div>
  );
};

export default Home;
