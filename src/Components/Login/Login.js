import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Login.module.css';
import LoginMessage from '../Login/LoginMessage';
import { loginActions } from '../Store/loginSlice';

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

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

    if (!haveAccount) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return alert('password and confirm password are not same');
      }
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('idToken', JSON.stringify(data));
        setHaveAccount(true);
        dispatch(loginActions.login(data.email));
      } else {
        const data = await res.json();
        throw data.error;
      }
    } catch (err) {
      alert(err.message);
    }
  };

if (isLoggedIn) {
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