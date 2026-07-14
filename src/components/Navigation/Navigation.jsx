import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import logoutHomeIcon from "../../images/logout-home.svg";
import logoutProfileIcon from "../../images/logout-profile.svg";
import menuHomeIcon from "../../images/mobile-menu-page.svg";
import menuProfileIcon from "../../images/mobile-menu-profile.svg";
import closeIcon from "../../images/close-icon.svg";
import "./Navigation.css";

function Navigation({ loggedIn, onLoginClick, onLogout, isSavedNews = false }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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

  const menuIcon = isMenuOpen
    ? closeIcon
    : isSavedNews
      ? menuProfileIcon
      : menuHomeIcon;

  return (
    <nav
      className={`navigation${
        isSavedNews ? " navigation_type_saved-news" : ""
      }${isMenuOpen ? " navigation_menu-opened" : ""}`}
      aria-label="Primary navigation"
    >
      <NavLink to="/" className="navigation__logo" onClick={closeMenu}>
        NewsExplorer
      </NavLink>

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
              alt="Log out"
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
        className="navigation__menu-button"
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        aria-controls="navigation-links"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <img
          className="navigation__menu-icon"
          src={menuIcon}
          alt={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </button>
    </nav>
  );
}

export default Navigation;
