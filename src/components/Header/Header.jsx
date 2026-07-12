import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({ loggedIn, onLoginClick, onLogout, onSearch }) {
  return (
    <header className="header">
      <div className="header__overlay">
        <Navigation
          loggedIn={loggedIn}
          onLoginClick={onLoginClick}
          onLogout={onLogout}
        />

        <div className="header__content">
          <h1 className="header__title">What's going on in the world?</h1>

          <p className="header__subtitle">
            Find the latest news on any topic and save articles in your account.
          </p>

          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
}

export default Header;
