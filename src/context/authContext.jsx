import React, { useState } from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  token: null,
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  function loginHandler(token) {
    setIsAuthenticated(true);
    setToken(token);
  }

  function logoutHandler() {
    setIsAuthenticated(false);
    setToken(null);
  }

  const contextValue = {
    isAuthenticated,
    token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
