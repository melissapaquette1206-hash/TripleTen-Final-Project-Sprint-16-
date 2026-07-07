import "./Preloader.css";

function Preloader() {
  return (
    <section className="preloader" aria-live="polite">
      <div className="preloader__container">
        <div className="circle-preloader" aria-label="Loading"></div>

        <p className="preloader__text">Searching for news...</p>
      </div>
    </section>
  );
}

export default Preloader;
