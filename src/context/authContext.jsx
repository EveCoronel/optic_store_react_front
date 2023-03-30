import Cookies from "js-cookie";
import React, { useState } from "react";


const AuthContext = React.createContext({
  token: null,
  login: (token) => { },
  logout: () => { },
  isAuthenticated: () => { }
});

export function AuthContextProvider(props) {
  const [token, setToken] = useState(null);

  function isAuthenticated() {
    const token = Cookies.get('session');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }
  function loginHandler(token) {
    setToken(token);
  }

  function logoutHandler() {
    Cookies.remove('session')
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
