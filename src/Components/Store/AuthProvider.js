import React, { useState, useEffect } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCHIRvD6SWnOT4UZQPtAJJoUg4lc55Gm6g",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json().then((data) => {
          setDisplayName(data.users[0].displayName);
          setPhoto(data.users[0].photoUrl);
        });
      })
      .catch((err) => {
        alert(err.error.message);
      });
  }, [token]);
  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // const completeProfileHandler = () => {
  //   setProfile((previous) => {
  //     return !previous;
  //   });
  // };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    displayName: displayName,
    imageUrl: photo,
    // completeProfile: completeProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;