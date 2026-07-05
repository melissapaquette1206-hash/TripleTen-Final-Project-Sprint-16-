import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import SavedNews from "./pages/SavedNews/SavedNews";
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
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({
        email,
        password,
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        return auth.getUserInfo(data.token);
      })
      .then(setCurrentUser)
      .catch(console.error);
    closeLogin();
  };

  const handleRegister = (userData) => {
    auth
      .register(userData)
      .then(() => {
        closeRegister();
        openLogin();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    auth
      .getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        closeLogin();
        return mainApi.getSavedArticles(token);
      })
      .then((articles) => {
        setSavedArticles(articles);
        setLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {" "}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
            />
          }
        />

        <Route
          path="/saved-news"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedNews savedArticles={savedArticles} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLogin={handleLogin}
        onRegisterClick={() => {
          closeLogin();
          openRegister();
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        onRegister={handleRegister}
      />
      <Route
        path="/saved-news"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <SavedNews />
          </ProtectedRoute>
        }
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
