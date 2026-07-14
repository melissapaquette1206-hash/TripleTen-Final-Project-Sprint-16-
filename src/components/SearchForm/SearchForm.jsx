import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(trimmedKeyword);
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);

    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__field">
        <input
          type="text"
          className={`search-form__input ${
            error ? "search-form__input_type_error" : ""
          }`}
          placeholder="Enter topic"
          value={keyword}
          onChange={handleChange}
          autoComplete="off"
          aria-label="Search news"
          aria-invalid={Boolean(error)}
          aria-describedby="search-form-error"
        />

        <span
          className="search-form__error"
          id="search-form-error"
          aria-live="polite"
        >
          {error}
        </span>
      </div>

      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
