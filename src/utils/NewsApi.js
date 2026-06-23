const API_KEY = "YOUR_NEWS_API_KEY";

class NewsApi {
  constructor() {
    this._baseUrl = "https://nomoreparties.co/news/v2/everything";
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    ```
return res.json();
```;
  }

  searchNews(keyword) {
    const today = new Date();

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const from = weekAgo.toISOString();
    const to = today.toISOString();

    return fetch(
      `${this._baseUrl}?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`,
    ).then(this._checkResponse);
  }
}

const newsApi = new NewsApi();

export default newsApi;
