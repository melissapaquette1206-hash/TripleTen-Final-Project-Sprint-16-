import NewsCardList from "../../components/NewsCardList/NewsCardList";

function SavedNews({ savedArticles }) {
  return (
    <>
      {" "}
      <section className="saved-news-header">
        {" "}
        <h1>Saved Articles </h1>
        <p>You have saved {savedArticles.length} articles</p>
      </section>
      <NewsCardList articles={savedArticles} />
    </>
  );
}

export default SavedNews;
