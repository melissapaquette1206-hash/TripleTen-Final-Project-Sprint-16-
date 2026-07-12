import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import Footer from "../../components/Footer/Footer";

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

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("searchResults");

      if (!storedResults) {
        return;
      }

      const parsedResults = JSON.parse(storedResults);

      if (Array.isArray(parsedResults)) {
        setArticles(parsedResults);
        setHasSearched(true);
      }
    } catch (err) {
      console.error("Could not restore previous search results:", err);
      localStorage.removeItem("searchResults");
      localStorage.removeItem("keyword");
    }
  }, []);

  const handleSearch = (keyword) => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setError("");
    setArticles([]);

    newsApi
      .searchNews(trimmedKeyword)
      .then((data) => {
        const receivedArticles = Array.isArray(data?.articles)
          ? data.articles
          : [];

        setArticles(receivedArticles);

        localStorage.setItem("searchResults", JSON.stringify(receivedArticles));
        localStorage.setItem("keyword", trimmedKeyword);
      })
      .catch((err) => {
        console.error("News search failed:", err);

        setArticles([]);
        setError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (article) => {
    if (!loggedIn) {
      onLoginClick();
      return;
    }

    const token = localStorage.getItem("jwt");

    if (!token) {
      onLoginClick();
      return;
    }

    const articleUrl = article.url || article.link;

    const alreadySaved = savedArticles.some(
      (savedArticle) => (savedArticle.link || savedArticle.url) === articleUrl,
    );

    if (alreadySaved) {
      return;
    }

    const keyword = localStorage.getItem("keyword") || "";

    const articleToSave = {
      keyword,
      title: article.title,
      text: article.description || article.text || "",
      date: article.publishedAt || article.date,
      source:
        typeof article.source === "object"
          ? article.source?.name
          : article.source,
      link: articleUrl,
      image: article.urlToImage || article.image,
    };

    mainApi
      .saveArticle(articleToSave, token)
      .then((savedArticle) => {
        setSavedArticles((currentArticles) => [
          ...currentArticles,
          savedArticle,
        ]);
      })
      .catch((err) => {
        console.error("Could not save article:", err);
      });
  };

  const handleDeleteArticle = (articleId) => {
    const token = localStorage.getItem("jwt");

    if (!token || !articleId) {
      return;
    }

    mainApi
      .deleteArticle(articleId, token)
      .then(() => {
        setSavedArticles((currentArticles) =>
          currentArticles.filter(
            (savedArticle) => savedArticle._id !== articleId,
          ),
        );
      })
      .catch((err) => {
        console.error("Could not delete article:", err);
      });
  };

  return (
    <>
      <Header
        loggedIn={loggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onSearch={handleSearch}
      />

      <Main
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        error={error}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        savedArticles={savedArticles}
        loggedIn={loggedIn}
        onLoginClick={onLoginClick}
      />

      <Footer />
    </>
  );
}

export default Home;
