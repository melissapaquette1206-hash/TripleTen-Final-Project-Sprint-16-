import "./About.css";
import React from "react";
import authorPic from "../../images/INSERTPICHERE";

function About() {
  return (
    <section className="about">
      <div className="about__left">
        <img className="about__left-picture" src={authorPic} alt="author pic" />
      </div>
      <div className="about__right">
        <h3 className="about__right-title">About the Author</h3>
        <p className="about__right-subtitle">
          This project was created during the TripleTen Software Engineering
          Program by Melissa Paquette. Melissa is a teacher transitioning into
          education technology. She specialized in elemenentary education,
          curriculum and instruction, and instructional design. Currently,
          Melissa is a math intervention teacher/tutor for an online school
          supporting stduents in middle and high school with their math
          education.
        </p>
      </div>
    </section>
  );
}

export default About;
