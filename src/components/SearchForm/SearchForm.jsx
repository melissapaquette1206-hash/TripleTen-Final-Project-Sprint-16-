import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter topic"
        className="search-form__input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      ```
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
