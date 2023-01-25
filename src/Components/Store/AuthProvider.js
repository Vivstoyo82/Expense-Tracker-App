import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(false);

  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const completeProfileHandler = () => {
    setProfile((previous) => {
      return !previous;
    });
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    completeProfile: completeProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;