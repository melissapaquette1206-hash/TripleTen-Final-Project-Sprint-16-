import { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

const INITIAL_ARTICLE_COUNT = 3;
const ARTICLES_PER_CLICK = 3;

function NewsCardList({
  articles = [],
  onSave,
  onDelete,
  savedArticles = [],
  loggedIn,
  onLoginClick,
}) {
  const [visibleArticleCount, setVisibleArticleCount] = useState(
    INITIAL_ARTICLE_COUNT,
  );

  useEffect(() => {
    setVisibleArticleCount(INITIAL_ARTICLE_COUNT);
  }, [articles]);

  const handleShowMore = () => {
    setVisibleArticleCount((currentCount) => currentCount + ARTICLES_PER_CLICK);
  };

  const visibleArticles = articles.slice(0, visibleArticleCount);
  const hasMoreArticles = visibleArticleCount < articles.length;

  return (
    <section className="results" aria-labelledby="search-results-title">
      <div className="results__container">
        <h2 className="results__title" id="search-results-title">
          Search results
        </h2>

        <div className="results__grid">
          {visibleArticles.map((article) => {
            const articleUrl = article.url || article.link;

            const savedArticle = savedArticles.find(
              (item) => (item.link || item.url) === articleUrl,
            );

            return (
              <NewsCard
                key={articleUrl}
                article={article}
                savedArticle={savedArticle}
                isSaved={Boolean(savedArticle)}
                loggedIn={loggedIn}
                onSave={onSave}
                onDelete={onDelete}
                onLoginClick={onLoginClick}
              />
            );
          })}
        </div>

        {hasMoreArticles && (
          <button
            type="button"
            className="results__show-more"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
