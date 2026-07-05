import "./NewsCard.css";

function NewsCard({ article, onSave, onDelete, isSaved }) {
  return (
    <article className="card">
      {" "}
      <img
        src={article.urlToImage}
        alt={article.title}
        className="card__image"
      />
      <div className="card__content">
        <p className="card__date">{article.publishedAt}</p>

        <h3 className="card__title">{article.title}</h3>

        <p className="card__text">{article.description}</p>

        <p className="card__source">{article.source?.name}</p>

        <button
          className="card__save-button"
          type="button"
          aria-label="Save article"
          onClick={() => {
            if (isSaved) {
              onDelete(article._id);
            } else {
              onSave(article);
            }
          }}
        />
      </div>
    </article>
  );
}

export default NewsCard;
