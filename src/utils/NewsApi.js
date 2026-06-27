const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

class NewsApi {
  constructor() {
    this._baseUrl = "https://newsapi.org/v2/everything";
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    return res.json();
  }

  searchNews(keyword) {
    const today = new Date();

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const from = weekAgo.toISOString().split("T")[0];

    const to = today.toISOString().split("T")[0];

    return fetch(
      `${this._baseUrl}?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`,
    ).then((res) => this._checkResponse(res));
  }
}

const newsApi = new NewsApi();

export default newsApi;
