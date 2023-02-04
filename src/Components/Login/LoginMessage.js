import React from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginMessage.module.css';
import { useSelector } from 'react-redux';


const LoginMessage = () => {

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const isVerified = useSelector((state) => state.login.isVerified);
    console.log(isVerified)


    const verifyEmailHandler = async () => {
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCHIRvD6SWnOT4UZQPtAJJoUg4lc55Gm6g",
            {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: JSON.parse(localStorage.getItem('idToken')).idToken,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    let errorMesssage = "Verification Failed";
                    throw new Error(errorMesssage);
                }
            })
            .then((data) => {
                alert("verification link is sent on mail click to verify");
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <React.Fragment>
            <div className={classes.mainProfile}>
                <span className={classes.welcome}>
                    Welcome to Expense Tracker...!!!
                </span>
                <span className={classes.profile}>
                    <span>Your profile is incomplete.</span>
                    <Link to='/profile'>
                        <b> Complete now</b>
                    </Link>
                </span>
            </div>
            {(<span className={classes.display}>JUST ONE STEP TO ADD YOUR EXPENSES 😃</span>)}
            {(<div className={classes.button}>
                
                <button onClick={verifyEmailHandler} className={classes.logout}>
                    Verify Email
                </button>
            </div>)}
        </React.Fragment>
    );
};

export default LoginMessage;