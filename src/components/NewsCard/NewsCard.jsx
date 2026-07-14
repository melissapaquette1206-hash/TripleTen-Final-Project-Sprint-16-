import bookmarkInactive from "../../images/bookmarkInactive.svg";
import bookmarkActive from "../../images/bookmarkBlue.svg";
import trashIcon from "../../images/trash-logo.svg";
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
      if (articleId) onDelete?.(articleId);
      return;
    }

    onSave?.(article);
  };

  const actionIcon = isSavedPage
    ? trashIcon
    : isSaved
      ? bookmarkActive
      : bookmarkInactive;

  return (
    <article className="card">
      <div className="card__image-container">
        {image ? (
          <img
            src={image}
            alt={`News article illustration: ${title}`}
            className="card__image"
            loading="lazy"
          />
        ) : (
          <div
            className="card__image card__image_placeholder"
            role="img"
            aria-label={`Image unavailable for ${title}`}
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
            className="card__action-button"
            type="button"
            aria-label={
              isSaved || isSavedPage
                ? "Remove article from saved articles"
                : "Save article"
            }
            onClick={handleActionClick}
          >
            <img
              className="card__action-icon"
              src={actionIcon}
              alt={isSavedPage ? "Delete saved article" : "Save article"}
            />
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
