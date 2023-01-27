import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const userLoggedIn = !!token;


  const fetchExpenseFromFirebase = useCallback(async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-186ef-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const fetchedExpenses = [];
      for (let key in data) {
        fetchedExpenses.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
      }
      setExpenses(fetchedExpenses);
    } catch (err) {
      alert(err.message);
    }
  }, []);


  const addExpenseToFirebase = async (expense) => {
    try {
      const response = await fetch(
        "https://expense-tracker-186ef-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchExpenseFromFirebase();
      }
      // const data = await response.json();
    } catch (err) {
      alert(err);
    }
  };

  const fetchAccountDetails = () => {
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
          setIsVerified(data.users[0].emailVerified);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  useEffect(() => {
    fetchExpenseFromFirebase();
  }, [fetchExpenseFromFirebase]);

  useEffect(() => {
    fetchAccountDetails();
  }, );


  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  const addExpenseHandler = (expense) => {
    setExpenses((prev) => {
      return [...prev, expense];
    });
    addExpenseToFirebase(expense);
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
    verified : isVerified,
    displayName: displayName,
    expenses: expenses,
    imageUrl: photo,
    logout: logoutHandler,
    addExpenseHandler: addExpenseHandler,
    fetchExpense: fetchExpenseFromFirebase,
    // completeProfile: completeProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;