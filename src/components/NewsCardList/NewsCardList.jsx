import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  return (
    <section className="results">
      {" "}
      <h2 className="results__title">Search Results </h2>
      <div className="results__grid">
        {articles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;
