import "./About.css";

function About() {
  return (
    <section className="about">
      {" "}
      <img src="/author.jpg" alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the Author</h2>

        <p className="about__text">
          This project was created during the TripleTen Software Engineering
          Program.
        </p>
      </div>
    </section>
  );
}

export default About;
