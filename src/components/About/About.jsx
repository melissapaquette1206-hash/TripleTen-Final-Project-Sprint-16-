import "./About.css";
import authorPic from "../../images/MelissaPaquette.png";

function About() {
  return (
    <section className="about" aria-labelledby="about-title">
      <div className="about__container">
        <img className="about__image" src={authorPic} alt="Melissa Paquette" />

        <div className="about__content">
          <h2 className="about__title" id="about-title">
            About the author
          </h2>

          <p className="about__text">
            This project was created during the TripleTen Software Engineering
            Program by Melissa Paquette. Melissa is a teacher transitioning into
            education technology. She specializes in elementary education,
            curriculum and instruction, and instructional design. Currently,
            Melissa is a math intervention teacher and tutor for an online
            school, supporting students in middle and high school with their
            math education.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
