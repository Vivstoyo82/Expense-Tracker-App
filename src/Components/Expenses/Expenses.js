import React, { useRef, useContext } from 'react';
import classes from './Expenses.module.css';
import ExpenseItems from './ExpenseItems';
import AuthContext from '../Store/auth-context';


const Expenses = () => {
  const authCtx = useContext(AuthContext);
  const inputAmountRef = useRef("");
  const inputDescriptionRef = useRef("");
  const inputCategoryRef = useRef("");

  // const email = JSON.parse(localStorage.getItem('idToken')).email;
  // const emailUrl = email.replace(/[@.]/g, '');


  const submitHandler = (e) => {
    e.preventDefault();
    const expense = {
      amount: inputAmountRef.current.value,
      description: inputDescriptionRef.current.value,
      category: inputCategoryRef.current.value,
    };

    authCtx.addExpenseHandler(expense);
  };

  let total = 0;
  // mapping the expenses
  const newExpenseList = authCtx.expenses.map((expense) => {
    total = total + +expense.amount
    return (<ExpenseItems
      key={expense.id}
      amount={expense.amount}
      description={expense.description}
      category={expense.category}
    />);
  });

  // Expense Component
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.type}>
          <label>Expense Category: </label>
          <select ref={inputCategoryRef} required>
            <option>Food</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Transport</option>
            <option>Adventure</option>
          </select>
        </div>
        <div className={classes.amount}>
          <label>Expense Amount: </label>
          <input type='number' min='0' ref={inputAmountRef} required />
        </div>
        <div className={classes.description}>
          <label>Expense Description: </label>
          <textarea type='text' ref={inputDescriptionRef} required />
        </div>
        <div className={classes.button}>
          <button type='submit'>Add Expense</button>
        </div>
      </form>
      {authCtx.expenses.length > 0 && (
        <div className={classes.items}>
          <div className={classes.title}>
            <span className={classes.titletype}>Type</span>
            <span className={classes.titleamount}>Amount</span>
            <span className={classes.titledescription}>Description</span>
            <span className={classes.total}>Total = Rs.{total}</span>
          </div>
          {newExpenseList}
        </div>
      )}
    </React.Fragment>
  );
};

export default Expenses;