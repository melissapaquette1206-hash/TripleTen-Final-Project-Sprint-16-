const BASE_URL = import.meta.env.VITE_MAIN_API_URL || "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .catch(() => ({}))
    .then((errorData) => {
      const message =
        errorData.message || `Request failed with status ${res.status}`;

      return Promise.reject(new Error(message));
    });
};

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      password,
    }),
  }).then(checkResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  }).then(checkResponse);
};

export const getUserInfo = (token) => {
  if (!token) {
    return Promise.reject(new Error("Authentication token is missing."));
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
