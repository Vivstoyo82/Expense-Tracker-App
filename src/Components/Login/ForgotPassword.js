import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const email = useRef();
  const navigate = useNavigate();

  const resetPasswordHandler = async (event) => {

    event.preventDefault();

    try {
      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCHIRvD6SWnOT4UZQPtAJJoUg4lc55Gm6g',
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email.current.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={resetPasswordHandler}>
      <label>ENTER THE REGISTERED EMAIL</label>
      <input type='email' placeholder='Registered Email' ref={email} />
      <button type='submit'>RESET PASSWORD</button>
    </form>
  );
};

export default ForgotPassword;