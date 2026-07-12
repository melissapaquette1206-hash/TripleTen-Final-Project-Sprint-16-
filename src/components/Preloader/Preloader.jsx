import "./Preloader.css";

function Preloader() {
  return (
    <section
      className="preloader"
      role="status"
      aria-live="polite"
      aria-label="Searching for news"
    >
      <div className="preloader__container">
        <div className="circle-preloader" aria-hidden="true" />

        <p className="preloader__text">Searching for news...</p>
      </div>
    </section>
  );
}

export default Preloader;
