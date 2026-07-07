import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";
import Preloader from "../../components/Preloader/Preloader";
import NoResults from "../../components/NoResults/NoResults";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";

function Home({
  loggedIn,
  onLoginClick,
  onLogout,
  savedArticles,
  setSavedArticles,
}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  // Restore previous search results
  useEffect(() => {
    const savedResults = localStorage.getItem("searchResults");

    if (savedResults) {
      setArticles(JSON.parse(savedResults));
      setHasSearched(true);
    }
  }, []);

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setError("");

    newsApi
      .searchNews(keyword)
      .then((data) => {
        setArticles(data.articles);

        localStorage.setItem("searchResults", JSON.stringify(data.articles));

        localStorage.setItem("keyword", keyword);
      })
      .catch(() => {
        setError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    const token = localStorage.getItem("jwt");

    mainApi
      .saveArticle(article, token)
      .then((savedArticle) => {
        setSavedArticles((prev) => [...prev, savedArticle]);
      })
      .catch(console.error);
  };

  return (
    <>
      <Header
        loggedIn={loggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onSearch={handleSearch}
      />

      <main>
        {isLoading && <Preloader />}

        {error && (
          <section className="search-error">
            <p>{error}</p>
          </section>
        )}

        {!isLoading && hasSearched && !error && articles.length === 0 && (
          <NoResults />
        )}

        {articles.length > 0 && (
          <NewsCardList
            articles={articles}
            onSave={handleSaveArticle}
            savedArticles={savedArticles}
          />
        )}

        <About />
      </main>
    </>
  );
}

export default Home;
