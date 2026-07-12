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
  const hasResults =
    !isLoading &&
    !error &&
    hasSearched &&
    Array.isArray(articles) &&
    articles.length > 0;

  const showNoResults =
    !isLoading &&
    !error &&
    hasSearched &&
    Array.isArray(articles) &&
    articles.length === 0;

  return (
    <main className="main">
      {isLoading && <Preloader />}

      {!isLoading && error && (
        <section className="main__status" aria-live="polite">
          <p className="main__error">{error}</p>
        </section>
      )}

      {showNoResults && <NoResults />}

      {hasResults && (
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
