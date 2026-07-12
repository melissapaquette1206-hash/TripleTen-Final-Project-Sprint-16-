import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import logoutHomeIcon from "../../images/logout-home.svg";
import logoutProfileIcon from "../../images/logout-profile.svg";
import "./Navigation.css";

function Navigation({ loggedIn, onLoginClick, onLogout, isSavedNews = false }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    closeMenu();
    onLoginClick?.();
  };

  const handleLogout = () => {
    closeMenu();
    onLogout?.();
  };

  const getLinkClassName = ({ isActive }) =>
    `navigation__link ${isActive ? "navigation__link_active" : ""}`;

  return (
    <nav
      className={`navigation ${
        isSavedNews ? "navigation_type_saved-news" : ""
      }`}
      aria-label="Primary navigation"
    >
      <NavLink to="/" className="navigation__logo" onClick={closeMenu}>
        NewsExplorer
      </NavLink>

      <div
        className={`navigation__links ${
          isMenuOpen ? "navigation__links_opened" : ""
        }`}
      >
        <NavLink to="/" className={getLinkClassName} onClick={closeMenu}>
          Home
        </NavLink>

        {loggedIn && (
          <NavLink
            to="/saved-news"
            className={getLinkClassName}
            onClick={closeMenu}
          >
            Saved articles
          </NavLink>
        )}

        {loggedIn ? (
          <button
            type="button"
            className="navigation__button"
            onClick={handleLogout}
            aria-label={`Log out ${currentUser?.name || "user"}`}
          >
            <span>{currentUser?.name || "User"}</span>

            <img
              className="navigation__logout-icon"
              src={isSavedNews ? logoutProfileIcon : logoutHomeIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        ) : (
          <button
            type="button"
            className="navigation__button"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        )}
      </div>

      <button
        className="navigation__menu"
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        aria-controls="navigation-links"
        onClick={() => {
          setIsMenuOpen((currentValue) => !currentValue);
        }}
      >
        <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
      </button>
    </nav>
  );
}

export default Navigation;
