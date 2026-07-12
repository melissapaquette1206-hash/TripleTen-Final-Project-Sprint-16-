import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Navigation.css";

function Navigation({ loggedIn, onLoginClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__logo">
        NewsExplorer
      </NavLink>

      <div className="navigation__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "navigation__link navigation__link_active"
              : "navigation__link"
          }
        >
          Home
        </NavLink>

        {loggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              isActive
                ? "navigation__link navigation__link_active"
                : "navigation__link"
            }
          >
            Saved Articles
          </NavLink>
        )}

        {loggedIn ? (
          <button
            type="button"
            className="navigation__button"
            onClick={onLogout}
            aria-label="Log out"
          >
            {currentUser?.name || "User"}
          </button>
        ) : (
          <button
            type="button"
            className="navigation__button"
            onClick={onLoginClick}
            aria-label="Sign in"
          >
            Sign In
          </button>
        )}
      </div>

      <button
        className="navigation__menu"
        type="button"
        aria-label="Open navigation menu"
      >
        ☰
      </button>
    </nav>
  );
}

export default Navigation;
