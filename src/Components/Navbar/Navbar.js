import React from 'react'
import {NavLink} from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
            <NavLink
              to='/home'
              className={classes.active}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/expenses'
              className={classes.active}
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={classes.active}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/profile'
              className={classes.active}
            >
              User Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/login'
              className={classes.active}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.button}>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar