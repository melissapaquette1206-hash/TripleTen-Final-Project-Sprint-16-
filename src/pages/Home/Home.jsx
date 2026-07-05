import { useState, useEffect } from "react";

import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import Preloader from "../../components/Preloader/Preloader";
import NoResults from "../../components/NoResults/NoResults";
import mainApi from "../../utils/MainApi";

import newsApi from "../../utils/NewsApi";

function Home({ savedArticles, setSavedArticles }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("searchResults");

    if (saved) {
      setArticles(JSON.parse(saved));
    }
  }, []);
  const token = localStorage.getItem("jwt");

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setError("");
    setHasSearched(true);

    newsApi
      .searchNews(keyword)
      .then((data) => {
        setArticles(data.articles);
        localStorage.setItem("searchResults", JSON.stringify(data.articles));
      })
      .catch(() => {
        setError("Sorry, something went wrong during the request.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    mainApi
      .saveArticle(article, token)
      .then((savedArticle) => {
        setSavedArticles((prev) => [...prev, savedArticle]);
      })
      .catch(console.error);
  };

  return (
    <>
      {" "}
      <Header />
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Preloader />}
      {error && <p className="search-error">{error}</p>}
      {!isLoading && hasSearched && !articles.length && !error && <NoResults />}
      {articles.length > 0 && (
        <NewsCardList articles={articles} onSave={handleSaveArticle} />
      )}
      <About />
      <Footer />
    </>
  );
}

export default Home;
