import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';
import AuthContext from '../Store/auth-context';

const Navbar = () => {

  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate()

  const logoutHandler = () => {
    authCtx.logout();
    authCtx.isLoggedIn = false
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
            {isLoggedIn && authCtx.displayName && (<Link
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
      {authCtx.isLoggedIn && (<div className={classes.button}>
        <button onClick={logoutHandler}>Logout</button>
      </div>)}
    </div>
  )
}

export default Navbar