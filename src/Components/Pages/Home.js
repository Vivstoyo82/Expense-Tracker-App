import React from 'react';
import LoginMessage from '../Login/LoginMessage';
import { useSelector } from 'react-redux';

const Home = () => {

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <div>
      {isLoggedIn && <LoginMessage />}
      {/* <h1 className={classes.welcome}>Welcome to Home page</h1> */}
    </div>
  );
};

export default Home;