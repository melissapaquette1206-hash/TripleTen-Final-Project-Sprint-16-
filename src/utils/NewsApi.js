const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res
      .json()
      .catch(() => ({}))
      .then((errorData) => {
        const message =
          errorData.message || `News request failed with status ${res.status}`;

        return Promise.reject(new Error(message));
      });
  }

  _request(url) {
    return fetch(url).then((res) => this._checkResponse(res));
  }

  searchNews(keyword) {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      return Promise.reject(
        new Error("Please enter a topic before searching."),
      );
    }

    if (!this._apiKey) {
      return Promise.reject(new Error("The News API key is missing."));
    }

    const today = new Date();
    const weekAgo = new Date(today);

    weekAgo.setDate(weekAgo.getDate() - 7);

    const from = weekAgo.toISOString().split("T")[0];
    const to = today.toISOString().split("T")[0];

    const searchParams = new URLSearchParams({
      q: trimmedKeyword,
      from,
      to,
      sortBy: "publishedAt",
      pageSize: "100",
      language: "en",
      apiKey: this._apiKey,
    });

    return this._request(`${this._baseUrl}?${searchParams.toString()}`);
  }
}

const newsApi = new NewsApi({
  baseUrl: "https://newsapi.org/v2/everything",
  apiKey: API_KEY,
});

export default newsApi;
