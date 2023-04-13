import React from "react";
import "../styles/Resources.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Resources = () => {
  return (
    <div>
      <Navbar />
      <div className="resources-body">
        <h1>Resources:</h1>
        <ul>
		<li><a href="https://www.duolingo.com/course/ja/en/Learn-Japanese-Online">Duolingo</a> - A free language learning platform that offers Japanese courses for beginners.</li>
		<li><a href="https://www.rosettastone.com/languages/japanese">Rosetta Stone</a> - A popular language learning program that offers Japanese courses for beginners and intermediate learners.</li>
		<li><a href="https://www.amazon.com/GENKI-Integrated-Course-Elementary-Japanese/dp/4789014401">Genki textbooks</a> - A popular series of textbooks that are widely used in Japanese language courses.</li>
		<li><a href="https://www.japanesepod101.com/">JapanesePod101</a> - An online platform that offers audio and video lessons for learning Japanese.</li>
		<li><a href="https://apps.ankiweb.net/">Anki</a> - A flashcard app that can be used to learn Japanese vocabulary and kanji.</li>
		<li><a href="https://www.guidetojapanese.org/learn/">Tae Kim's Guide to Learning Japanese</a> - A free online resource that provides a comprehensive overview of Japanese grammar.</li>
		<li><a href="https://www.wanikani.com/">WaniKani</a> - A gamified platform that focuses on teaching kanji and vocabulary through mnemonics and repetition.</li>
		<li><a href="https://www.lingodeer.com/">Lingodeer</a> - A language learning app that offers courses in Japanese.</li>
		<li><a href="https://www3.nhk.or.jp/news/easy/">NHK Easy Japanese</a> - A website that provides news articles in simplified Japanese, great for practicing reading and listening comprehension skills.</li>
	</ul>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
