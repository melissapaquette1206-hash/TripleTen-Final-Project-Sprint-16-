import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ loggedIn, onLoginClick }) {
  return (
    <nav className="navigation">
      {" "}
      <Link to="/" className="navigation__logo">
        NewsExplorer{" "}
      </Link>
      <div className="navigation__links">
        <Link to="/" className="navigation__link">
          Home
        </Link>

        {loggedIn && (
          <Link to="/saved-news" className="navigation__link">
            Saved Articles
          </Link>
        )}

        {!loggedIn && (
          <button className="navigation__button" onClick={onLoginClick}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
