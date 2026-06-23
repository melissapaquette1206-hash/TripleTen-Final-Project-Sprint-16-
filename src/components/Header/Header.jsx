import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ loggedIn, onLoginClick }) {
  return (
    <header className="header">
      {" "}
      <div className="header__overlay">
        {" "}
        <Navigation loggedIn={loggedIn} onLoginClick={onLoginClick} />
        <div className="header__content">
          <h1 className="header__title">What's going on in the world?</h1>

          <p className="header__subtitle">
            Find the latest news on any topic and save articles in your account.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
