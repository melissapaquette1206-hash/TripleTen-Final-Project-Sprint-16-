import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import logoutHomeIcon from "../../images/logout-home.svg";
import logoutProfileIcon from "../../images/logout-profile.svg";
import "./Navigation.css";

function Navigation({ loggedIn, onLoginClick, onLogout, isSavedNews = false }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationRef = useRef(null);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    const handleOutsideClick = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const getLinkClassName = ({ isActive }) =>
    `navigation__link${isActive ? " navigation__link_active" : ""}`;

  const handleLoginClick = () => {
    closeMenu();
    onLoginClick?.();
  };

  const handleLogout = () => {
    closeMenu();
    onLogout?.();
  };

  return (
    <nav
      ref={navigationRef}
      className={`navigation${
        isSavedNews ? " navigation_type_saved-news" : ""
      }${isMenuOpen ? " navigation_menu-opened" : ""}`}
      aria-label="Primary navigation"
    >
      <NavLink to="/" className="navigation__logo" onClick={closeMenu}>
        NewsExplorer
      </NavLink>

      <button
        className={`navigation__menu-button${
          isMenuOpen ? " navigation__menu-button_opened" : ""
        }`}
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        aria-controls="navigation-links"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span className="navigation__menu-line" aria-hidden="true" />
        <span className="navigation__menu-line" aria-hidden="true" />
      </button>

      <div
        id="navigation-links"
        className={`navigation__links${
          isMenuOpen ? " navigation__links_opened" : ""
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
          >
            <span className="navigation__user-name">
              {currentUser?.name || "User"}
            </span>
            <img
              className="navigation__logout-icon"
              src={isSavedNews ? logoutProfileIcon : logoutHomeIcon}
              alt="Log out of NewsExplorer"
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
    </nav>
  );
}

export default Navigation;
