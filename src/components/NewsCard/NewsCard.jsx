import "./NewsCard.css";

function NewsCard({
  article,
  onSave,
  onDelete,
  isSaved = false,
  savedArticle,
  loggedIn = false,
  onLoginClick,
  isSavedPage = false,
}) {
  const image = article.urlToImage || article.image;
  const title = article.title || "Untitled article";
  const description = article.description || article.text || "";
  const source =
    typeof article.source === "object" ? article.source?.name : article.source;

  const articleUrl = article.url || article.link;
  const publishedDate = article.publishedAt || article.date;

  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleActionClick = () => {
    if (!loggedIn) {
      onLoginClick?.();
      return;
    }

    if (isSaved) {
      const articleId = savedArticle?._id || article._id;

      if (!articleId) {
        console.error("Cannot delete article: missing article ID.");
        return;
      }

      onDelete?.(articleId);
      return;
    }

    onSave?.(article);
  };

  return (
    <article className="card">
      <div className="card__image-container">
        {image ? (
          <img src={image} alt={title} className="card__image" loading="lazy" />
        ) : (
          <div
            className="card__image card__image_placeholder"
            role="img"
            aria-label="Article image unavailable"
          />
        )}

        {isSavedPage && article.keyword && (
          <span className="card__keyword">{article.keyword}</span>
        )}

        <div className="card__action-container">
          {!loggedIn && !isSavedPage && (
            <span className="card__tooltip" role="tooltip">
              Sign in to save articles
            </span>
          )}

          <button
            className={`card__action-button ${
              isSaved ? "card__action-button_saved" : ""
            } ${isSavedPage ? "card__action-button_delete" : ""}`}
            type="button"
            aria-label={
              isSaved || isSavedPage
                ? "Remove article from saved articles"
                : "Save article"
            }
            onClick={handleActionClick}
          >
            {isSavedPage ? (
              <svg
                className="card__action-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M8 8h8l-.7 11H8.7L8 8Zm2-3h4l1 1h4v2H5V6h4l1-1Z" />
              </svg>
            ) : (
              <svg
                className="card__action-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M6 3h12v18l-6-4-6 4V3Zm2 2v12.3l4-2.7 4 2.7V5H8Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="card__content">
        <time className="card__date" dateTime={publishedDate || undefined}>
          {formattedDate}
        </time>

        <h3 className="card__title">
          {articleUrl ? (
            <a
              className="card__title-link"
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        <p className="card__text">{description}</p>

        <p className="card__source">{source || "Unknown source"}</p>
      </div>
    </article>
  );
}

export default NewsCard;
