import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import SavedNews from "./components/SavedNews/SavedNews";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "./contexts/CurrentUserContext";
import * as auth from "./utils/auth";
import mainApi from "./utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .authorize({ email, password })
      .then(({ token }) => {
        localStorage.setItem("jwt", token);

        return auth.getUserInfo(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);

        const token = localStorage.getItem("jwt");

        return mainApi.getSavedArticles(token);
      })
      .then((articles) => {
        setSavedArticles(Array.isArray(articles) ? articles : []);
        closeLogin();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        throw err;
      });
  };

  const handleRegister = (userData) => {
    return auth
      .register(userData)
      .then(() => {
        closeRegister();
        openLogin();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        throw err;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("newsExplorerCurrentUser");

    setLoggedIn(false);
    setCurrentUser({});
    setSavedArticles([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    Promise.all([auth.getUserInfo(token), mainApi.getSavedArticles(token)])
      .then(([user, articles]) => {
        setCurrentUser(user);
        setSavedArticles(Array.isArray(articles) ? articles : []);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error("Session restoration failed:", err);

        localStorage.removeItem("jwt");
        setLoggedIn(false);
        setCurrentUser({});
        setSavedArticles([]);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
