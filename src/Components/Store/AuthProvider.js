import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
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

  const removeExpenseFromFirebase = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `https://expense-tracker-186ef-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchExpenseFromFirebase();
      }
      const data = response.json();
      console.log("expense deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const editExpenseInFirebase = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-186ef-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchExpenseFromFirebase();
        setExpenseId(null);
        setEdit(false);
      }
    } catch (err) {
      alert(err.message);
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

  const removeExpenseHandler = (id) => {
    console.log(id)
    removeExpenseFromFirebase(id);
  };

  const editExpenseHandler = (expense) => {
    editExpenseInFirebase(expense);
  };

  const showEditForm = (id) => {
    setEdit(true);
    setExpenseId(id);
  };

  const hideEditForm = () => {
    setEdit(false);
  };

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
    removeExpense: removeExpenseHandler,
    editExpense: editExpenseHandler,
    showEdit: showEditForm,
    hideEdit: hideEditForm,
    // completeProfile: completeProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;