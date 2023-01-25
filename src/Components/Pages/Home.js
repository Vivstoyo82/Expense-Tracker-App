import React, { useContext } from 'react';
import AuthContext from '../Store/auth-context';
import LoginMessage from '../Login/LoginMessage';

const Home = () => {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      {isLoggedIn && <LoginMessage />}
      {/* <h1 className={classes.welcome}>Welcome to Home page</h1> */}
    </div>
  );
};

export default Home;