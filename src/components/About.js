import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/About.css";
import email from "../images/email.png";
import github from "../images/github.png";
import linkedin from "../images/linkedin.png";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-body">
        <h1>Welcome to Kuizu!</h1>
        <p>
          Hello! My name is Angel Pilor and I created this website for my final project
          for my final year in the ITAS Web and Mobile Design Program at VIU. 
          I used React to create the front-end and Firestore, a NoSQL database, to store
          all the quiz data. By choosing this tech-stack I could ensure that the website
          was not only user-friendly but also highly efficient and reliable. The quizzes on Kuizu are based on the chapters in the Genki I
          textbook, which is a beginner's guide to learning Japanese. 
        </p>
        <p>
          As a child, I have always been fascinated by Japanese culture and language,
          and I've always wanted to learn it. This website is a testament to
          that interest, and it is a personal achievement for me to have created
          something that combines my passions in design and learning languages.
        </p>
        <p>
          As I worked on this website, I poured all of my knowledge and skills
          that I've gained from the two years in the program into it. This
          website represents the culmination of my education and my abilities in
          web development and database management. I hope that it serves as a
          valuable resource for anyone who wants to learn Japanese, and that it
          reflects my passion for design and learning languages.
        </p>
        <p>
          If you need to contact me, please feel free to use one of my social
          links and I'll be happy to get back to you as soon as possible. I'm
          always open to hearing feedback or suggestions about the website, as
          well as any opportunities for collaboration or networking. Thank you
          for visiting Kuizu!
        </p>
        <div className="socials">
          <a
            href="mailto:agnpilor@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-icons" src={email} alt="email icon" />
          </a>
          <a
            href="https://github.com/agnpilor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-icons" src={github} alt="github icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/angelica-pilor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="social-icons" src={linkedin} alt="linkedin icon" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
