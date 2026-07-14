const USERS_KEY = "newsExplorerUsers";
const TOKEN_KEY = "jwt";
const CURRENT_USER_KEY = "newsExplorerCurrentUser";

const createMockToken = (email) => {
  return `mock-token-${btoa(email)}`;
};

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const register = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const normalizedEmail = email.trim().toLowerCase();

      const userAlreadyExists = users.some(
        (user) => user.email === normalizedEmail,
      );

      if (userAlreadyExists) {
        reject(new Error("A user with this email already exists."));
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

      resolve({
        name: newUser.name,
        email: newUser.email,
      });
    }, 500);
  });
};

export const authorize = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const normalizedEmail = email.trim().toLowerCase();

      const user = users.find(
        (item) => item.email === normalizedEmail && item.password === password,
      );

      if (!user) {
        reject(new Error("Incorrect email or password."));
        return;
      }

      const token = createMockToken(user.email);

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      );

      resolve({ token });
    }, 500);
  });
};

export const getUserInfo = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const currentUser = localStorage.getItem(CURRENT_USER_KEY);

      if (!token || token !== storedToken || !currentUser) {
        reject(new Error("Invalid token."));
        return;
      }

      try {
        resolve(JSON.parse(currentUser));
      } catch {
        reject(new Error("Could not restore user information."));
      }
    }, 300);
  });
};
