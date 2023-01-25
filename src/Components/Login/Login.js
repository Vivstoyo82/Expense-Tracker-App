import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import AuthContext from '../Store/auth-context';
import classes from './Login.module.css';
// import { loginActions } from '../store/loginSlice';
import LoginMessage from '../Login/LoginMessage';

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const authCtx = useContext(AuthContext);

  const accountHandler = () => {
    setHaveAccount((preState) => {
      return !preState;
    });
  };

  let url;

  if (haveAccount) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHIRvD6SWnOT4UZQPtAJJoUg4lc55Gm6g';
  } else {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHIRvD6SWnOT4UZQPtAJJoUg4lc55Gm6g';
  }

  const loginFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!haveAccount) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return alert('password and confirm password are not same');
      }
    }

    fetch(url, {
      method : "post",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          // const data = await response.json();
          let errorMesssage = "Authentication Failed";
          throw new Error(errorMesssage);
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        console.log(data.idToken);
        console.log("user has successfully signed up");
      })
      .catch((err) => {
        alert(err.message);
      });
};

if (authCtx.isLoggedIn) {
  return <LoginMessage />;
}

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={loginFormHandler}>
        <input type='email' placeholder='Email' ref={emailRef} />
        <input type='password' placeholder='Password' ref={passwordRef} />
        {!haveAccount && (
          <input
            type='password'
            placeholder='Confirm Password'
            ref={confirmPasswordRef}
          />
        )}
        <button type='submit'>
          {haveAccount ? 'Login' : 'Create Account'}
        </button>
        {haveAccount ? <Link to='/resetpassword'>Forgot Password?</Link> : ''}
      </form>
      <div className={classes.create} onClick={accountHandler}>
        {haveAccount
          ? `Don't have an account? Sign Up`
          : `Have an account? Sign In`}
      </div>
    </div>
  );
};

export default Login;