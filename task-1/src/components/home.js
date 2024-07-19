import React from 'react';
import '../App.css'; // Import home styles if needed
import twitterIcon from '../assets/twitter.png';
import githubIcon from '../assets/github.png';
import gmailIcon from '../assets/gmail.png';
import selfpic from '../assets/dev.png';

const Home = () => (
  <div className="home">
    <div className="home-content">
      <div className="hello">
        <p>Hello! Its me</p>
        <h1>Momin Mubash</h1>
        <p className="short-text">And I am a full-stack-developer</p>
        <div className="social-links">
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" />
          </a>  
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={gmailIcon} alt="Instagram" />
          </a>
        </div>
        <button className="contact-button">Contact Me</button>
      </div>
      
    </div>
  </div>
);

export default Home;
