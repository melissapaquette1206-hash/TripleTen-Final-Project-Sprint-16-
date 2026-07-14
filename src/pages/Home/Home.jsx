import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import mainApi from "../../utils/MainApi";

function Home({
  loggedIn,
  onLoginClick,
  onLogout,
  savedArticles,
  setSavedArticles,
  articles,
  isLoading,
  hasSearched,
  searchError,
  onSearch,
}) {
  const handleSaveArticle = (article) => {
    if (!loggedIn) {
      onLoginClick();
      return;
    }

    const token = localStorage.getItem("jwt");
    const articleUrl = article.url || article.link;
    const alreadySaved = savedArticles.some(
      (savedArticle) => (savedArticle.link || savedArticle.url) === articleUrl,
    );

    if (!token || alreadySaved) return;

    const articleToSave = {
      keyword: localStorage.getItem("keyword") || "",
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
      .catch((error) => console.error("Could not save article:", error));
  };

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
    <>
      <Header
        loggedIn={loggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onSearch={onSearch}
      />
      <Main
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        error={searchError}
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
