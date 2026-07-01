onDelete = { handleDeleteArticle };

const handleDeleteArticle = (id) => {
  mainApi.deleteArticle(id, token).then(() => {
    setSavedArticles((articles) =>
      articles.filter((article) => article._id !== id),
    );
  });
};
