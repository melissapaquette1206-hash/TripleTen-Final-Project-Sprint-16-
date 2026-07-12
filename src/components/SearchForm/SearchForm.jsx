import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return;

    onSearch(trimmedKeyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter topic"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
        minLength={2}
        autoComplete="off"
        aria-label="Search news"
      />

      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
