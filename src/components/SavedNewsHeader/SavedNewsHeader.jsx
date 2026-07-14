import "./SavedNewsHeader.css";

function SavedNewsHeader({ currentUser, savedArticles = [] }) {
  const userName = currentUser?.name || "User";
  const articleCount = savedArticles.length;

  const keywordCounts = savedArticles.reduce((counts, article) => {
    const keyword = article.keyword?.trim();

    if (!keyword) {
      return counts;
    }

    counts[keyword] = (counts[keyword] || 0) + 1;

    return counts;
  }, {});

  const sortedKeywords = Object.entries(keywordCounts)
    .sort(([, firstCount], [, secondCount]) => secondCount - firstCount)
    .map(([keyword]) => keyword);

  const createKeywordSummary = () => {
    if (sortedKeywords.length === 0) {
      return "No keywords yet";
    }

    if (sortedKeywords.length === 1) {
      return sortedKeywords[0];
    }

    if (sortedKeywords.length === 2) {
      return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    }

    const remainingKeywordCount = sortedKeywords.length - 2;

    return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${remainingKeywordCount} ${
      remainingKeywordCount === 1 ? "other" : "others"
    }`;
  };

  const articleLabel = articleCount === 1 ? "article" : "articles";

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__label">Saved articles</p>

        <h1 className="saved-news-header__title">
          {userName}, you have {articleCount} saved {articleLabel}
        </h1>

        <p className="saved-news-header__keywords">
          By keywords:{" "}
          <span className="saved-news-header__keywords-list">
            {createKeywordSummary()}
          </span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
