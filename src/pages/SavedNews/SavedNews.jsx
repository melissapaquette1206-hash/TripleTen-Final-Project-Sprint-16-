import { useContext } from "react";

import Navigation from "../../components/Navigation/Navigation";
import SavedNewsHeader from "../../components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import Footer from "../../components/Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import "./SavedNews.css";

function SavedNews({ savedArticles = [], setSavedArticles, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteArticle = (articleId) => {
    const token = localStorage.getItem("jwt");
    if (!token || !articleId) return;

    mainApi
      .deleteArticle(articleId, token)
      .then(() => {
        setSavedArticles((currentArticles) =>
          currentArticles.filter((article) => article._id !== articleId),
        );
      })
      .catch((error) => console.error("Could not delete article:", error));
  };

  return (
    <div className="saved-news-page">
      <header className="saved-news-page__header">
        <Navigation loggedIn onLogout={onLogout} isSavedNews />
        <SavedNewsHeader
          currentUser={currentUser}
          savedArticles={savedArticles}
        />
      </header>

      <main className="saved-news-page__main">
        {savedArticles.length > 0 ? (
          <NewsCardList
            articles={savedArticles}
            savedArticles={savedArticles}
            onDelete={handleDeleteArticle}
            isSavedPage
            loggedIn
          />
        ) : (
          <section className="saved-news-page__empty" aria-live="polite">
            <h2 className="saved-news-page__empty-title">No saved articles</h2>
            <p className="saved-news-page__empty-text">
              Your saved articles will appear here.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SavedNews;
