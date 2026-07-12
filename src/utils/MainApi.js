class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return res
        .json()
        .catch(() => ({}))
        .then((errorData) => {
          const message =
            errorData.message || `Request failed with status ${res.status}`;

          return Promise.reject(new Error(message));
        });
    }

    if (res.status === 204) {
      return Promise.resolve(null);
    }

    return res.json();
  }

  _request(url, options = {}) {
    return fetch(url, options).then((res) => this._checkResponse(res));
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getSavedArticles(token) {
    return this._request(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  saveArticle(article, token) {
    return this._request(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
  }

  deleteArticle(articleId, token) {
    return this._request(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const mainApi = new MainApi({
  baseUrl: import.meta.env.VITE_MAIN_API_URL || "http://localhost:3001",
});

export default mainApi;
