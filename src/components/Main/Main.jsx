import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import NoResults from "../NoResults/NoResults";
import "./Main.css";

function Main({
  articles,
  isLoading,
  hasSearched,
  error,
  onSaveArticle,
  onDeleteArticle,
  savedArticles,
  loggedIn,
  onLoginClick,
}) {
  const showResults =
    !isLoading && !error && hasSearched && articles.length > 0;
  const showNoResults =
    !isLoading && !error && hasSearched && articles.length === 0;

  return (
    <main className="main">
      {isLoading && <Preloader />}
      {!isLoading && error && (
        <section className="main__error" aria-live="polite">
          <p className="main__error-text">{error}</p>
        </section>
      )}
      {showNoResults && <NoResults />}
      {showResults && (
        <NewsCardList
          articles={articles}
          onSave={onSaveArticle}
          onDelete={onDeleteArticle}
          savedArticles={savedArticles}
          loggedIn={loggedIn}
          onLoginClick={onLoginClick}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
