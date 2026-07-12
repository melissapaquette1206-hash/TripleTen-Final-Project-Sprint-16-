import { useContext } from "react";

import Navigation from "../../components/Navigation/Navigation";
import SavedNewsHeader from "../../components/SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

function SavedNews({ savedArticles, setSavedArticles, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteArticle = (articleId) => {
    const token = localStorage.getItem("jwt");

    if (!token || !articleId) {
      return;
    }

    mainApi
      .deleteArticle(articleId, token)
      .then(() => {
        setSavedArticles((currentArticles) =>
          currentArticles.filter((article) => article._id !== articleId),
        );
      })
      .catch((err) => {
        console.error("Could not delete article:", err);
      });
  };

  return (
    <>
      <header className="saved-news-page">
        <Navigation loggedIn={true} onLogout={onLogout} isSavedNews />

        <SavedNewsHeader
          currentUser={currentUser}
          savedArticles={savedArticles}
        />
      </header>

      <NewsCardList
        articles={savedArticles}
        savedArticles={savedArticles}
        onDelete={handleDeleteArticle}
        isSavedPage
        loggedIn
      />
    </>
  );
}

export default SavedNews;
