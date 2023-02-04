import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../Store/loginSlice';
import { themeActions } from '../Store/themeSlice';
import { expenseAction } from '../Store/expenseSlice';

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const premium = useSelector((state) => state.theme.premium);
  const togglebtn = useSelector((state) => state.theme.togglebtn);
  const toggle = useSelector((state) => state.theme.toggle);
  const expenses = useSelector((state) => state.expense.expenses);


  const logoutHandler = () => {
    dispatch(loginActions.logout());
    dispatch(themeActions.light());
    dispatch(themeActions.premium(false));
    dispatch(expenseAction.firstTime(true));
    navigate("/login", { replace: true });
  };

  const expenseList = expenses
    .map((e) => {
      return [e.description, e.category, e.amount];
    })
    .join("\n");
  const blob = new Blob([expenseList]);
  const ref = URL.createObjectURL(blob);

  const themeHandler = () => {
    dispatch(themeActions.showToggle());
  };

  const togglehemeHandler = () => {
    dispatch(themeActions.switchToggle());
  };

  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
            {isLoggedIn && (<Link
              to='/home'
              className={classes.active}
            >
              Home
            </Link>)}
          </li>
          <li>
            {isLoggedIn && (<Link
              to='/expenses'
              className={classes.active}
            >
              Expenses
            </Link>)}
          </li>
          <li>
            {isLoggedIn && (<Link
              to='/about'
              className={classes.active}
            >
              About Us
            </Link>)}
          </li>

          <li>
            {isLoggedIn && (<Link
              to='/profile'
              className={classes.active}
            >
              User Profile
            </Link>)}
          </li>
          <li>
            {!isLoggedIn && (<Link
              to='/login'
              className={classes.active}
            >
              Login
            </Link>)}
          </li>
        </ul>
        {/* {premium && isLoggedIn && (
          <button
            className={classes.button}
            onClick={themeHandler}
          >
            {togglebtn ? "Premium" : "Activate Premium"}
          </button>
        )} */}
        {/* {premium && togglebtn && isLoggedIn && (
          <li className={classes.button}>
            <button
              className={classes.active}
              onClick={togglehemeHandler}
            >
              {toggle ? "Light" : "Dark "}
            </button>
          </li>
        )} */}

        
      </nav>
      {isLoggedIn && (
          <li className={classes.active}>
            <a
              className={classes.active}
              download="file.csv"
              href={ref}
            >
              Download expenses
            </a>
          </li>
        )}
      {<li className={classes.button}>
        {isLoggedIn && (<button onClick={logoutHandler}>Logout</button>)}
      </li>}
    </div>
  )
}

export default Navbar