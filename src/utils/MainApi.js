class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    ```
return res.json();
```;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  getSavedArticles(token) {
    return this._request(`${this._baseUrl}/articles`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  saveArticle(article, token) {
    return this._request(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
  }

  deleteArticle(id, token) {
    return this._request(`${this._baseUrl}/articles/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "http://localhost:3001",
});

export default mainApi;
