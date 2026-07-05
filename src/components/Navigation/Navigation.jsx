import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ loggedIn, onLoginClick, onLogout }) {
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

        {loggedIn ? (
          <button
            type="button"
            onClick={onLogout}
            className="navigation__button"
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            onClick={onLoginClick}
            className="navigation__button"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
