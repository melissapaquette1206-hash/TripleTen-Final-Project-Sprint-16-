import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import SavedNews from "./pages/SavedNews/SavedNews";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "./contexts/CurrentUserContext";
import * as auth from "./utils/auth";
import mainApi from "./utils/MainApi";
import newsApi from "./utils/NewsApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeRegister = () => setIsRegisterOpen(false);

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setArticles([]);

    return newsApi
      .searchNews(keyword)
      .then((data) => {
        const receivedArticles = Array.isArray(data?.articles)
          ? data.articles
          : [];

        setArticles(receivedArticles);
        localStorage.setItem("searchResults", JSON.stringify(receivedArticles));
        localStorage.setItem("keyword", keyword);
      })
      .catch((error) => {
        console.error("News search failed:", error);
        setSearchError(
          "Sorry, something went wrong during the request. Please try again later.",
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) =>
    auth
      .authorize({ email, password })
      .then(({ token }) => auth.getUserInfo(token))
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        return mainApi.getSavedArticles(localStorage.getItem("jwt"));
      })
      .then((storedArticles) => {
        setSavedArticles(Array.isArray(storedArticles) ? storedArticles : []);
        closeLogin();
      });

  const handleRegister = (userData) =>
    auth.register(userData).then(() => {
      closeRegister();
      openLogin();
    });

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("newsExplorerCurrentUser");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedArticles([]);
  };

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        if (Array.isArray(parsedResults)) {
          setArticles(parsedResults);
          setHasSearched(true);
        }
      } catch (error) {
        console.error("Could not restore search results:", error);
        localStorage.removeItem("searchResults");
      }
    }

    const token = localStorage.getItem("jwt");
    if (!token) return;

    Promise.all([auth.getUserInfo(token), mainApi.getSavedArticles(token)])
      .then(([user, storedArticles]) => {
        setCurrentUser(user);
        setSavedArticles(Array.isArray(storedArticles) ? storedArticles : []);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Session restoration failed:", error);
        localStorage.removeItem("jwt");
        localStorage.removeItem("newsExplorerCurrentUser");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedIn={loggedIn}
                onLoginClick={openLogin}
                onLogout={handleLogout}
                savedArticles={savedArticles}
                setSavedArticles={setSavedArticles}
                articles={articles}
                isLoading={isLoading}
                hasSearched={hasSearched}
                searchError={searchError}
                onSearch={handleSearch}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedNews
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeLogin}
          onLogin={handleLogin}
          onRegisterClick={openRegister}
        />
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={closeRegister}
          onRegister={handleRegister}
          onLoginClick={openLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
