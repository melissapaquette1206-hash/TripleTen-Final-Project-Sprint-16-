const SAVED_ARTICLES_KEY = "newsExplorerSavedArticles";

class MainApi {
  _getSavedArticles() {
    try {
      return JSON.parse(localStorage.getItem(SAVED_ARTICLES_KEY)) || [];
    } catch {
      return [];
    }
  }

  _validateToken(token) {
    const storedToken = localStorage.getItem("jwt");

    if (!token || token !== storedToken) {
      throw new Error("Invalid token.");
    }
  }

  getSavedArticles(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this._validateToken(token);
          resolve(this._getSavedArticles());
        } catch (err) {
          reject(err);
        }
      }, 300);
    });
  }

  saveArticle(article, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this._validateToken(token);

          const savedArticles = this._getSavedArticles();

          const alreadySaved = savedArticles.some(
            (item) => item.link === article.link,
          );

          if (alreadySaved) {
            reject(new Error("This article has already been saved."));
            return;
          }

          const savedArticle = {
            ...article,
            _id: crypto.randomUUID(),
          };

          localStorage.setItem(
            SAVED_ARTICLES_KEY,
            JSON.stringify([...savedArticles, savedArticle]),
          );

          resolve(savedArticle);
        } catch (err) {
          reject(err);
        }
      }, 300);
    });
  }

  deleteArticle(articleId, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this._validateToken(token);

          const savedArticles = this._getSavedArticles();
          const updatedArticles = savedArticles.filter(
            (article) => article._id !== articleId,
          );

          localStorage.setItem(
            SAVED_ARTICLES_KEY,
            JSON.stringify(updatedArticles),
          );

          resolve({ message: "Article deleted." });
        } catch (err) {
          reject(err);
        }
      }, 300);
    });
  }
}

const mainApi = new MainApi();

export default mainApi;
