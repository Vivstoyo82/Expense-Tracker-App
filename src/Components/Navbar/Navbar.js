import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../Store/loginSlice';
import { themeActions } from '../Store/themeSlice';
import { expenseAction } from '../Store/expenseSlice';

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);


  const logoutHandler = () => {
    dispatch(loginActions.logout());
    dispatch(themeActions.light());
    dispatch(themeActions.premium(false));
    dispatch(expenseAction.firstTime(true));
    navigate("/login", {replace : true});
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
      </nav>
      {isLoggedIn && (<div className={classes.button}>
        <button onClick={logoutHandler}>Logout</button>
      </div>)}
    </div>
  )
}

export default Navbar