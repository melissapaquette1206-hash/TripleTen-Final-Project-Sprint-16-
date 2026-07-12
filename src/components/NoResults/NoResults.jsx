import "./NoResults.css";

function NoResults() {
  return (
    <section
      className="no-results"
      role="status"
      aria-live="polite"
      aria-labelledby="no-results-title"
    >
      <div className="no-results__icon" aria-hidden="true" />

      <h2 className="no-results__title" id="no-results-title">
        Nothing found
      </h2>

      <p className="no-results__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}

export default NoResults;
