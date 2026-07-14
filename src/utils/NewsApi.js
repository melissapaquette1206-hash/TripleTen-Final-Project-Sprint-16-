const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _checkResponse(response) {
    if (response.ok) return response.json();

    return response
      .json()
      .catch(() => ({}))
      .then((errorData) =>
        Promise.reject(
          new Error(
            errorData.message ||
              `News request failed with status ${response.status}`,
          ),
        ),
      );
  }

  searchNews(keyword) {
    if (!this._apiKey) {
      return Promise.reject(new Error("The News API key is missing."));
    }

    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const searchParams = new URLSearchParams({
      q: keyword,
      from: weekAgo.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
      pageSize: "100",
      apiKey: this._apiKey,
    });

    return fetch(`${this._baseUrl}?${searchParams.toString()}`).then(
      (response) => this._checkResponse(response),
    );
  }
}

const newsApi = new NewsApi({
  baseUrl: NEWS_API_BASE_URL,
  apiKey: API_KEY,
});

export default newsApi;
