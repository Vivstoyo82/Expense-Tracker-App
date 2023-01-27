import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  expenses : [],
  displayName: "",
  imageUrl: "",
  verified: false,
  login: () => {},
  logout: () => {},
  addExpense: () => {},
  fetchExpense: () => {},
});

export default AuthContext;