import React, { Fragment, useContext } from 'react';
import AuthContext from '../Store/auth-context';
import classes from './ExpenseItems.module.css';

const ExpenseItems = (props) => {

    const authCtx = useContext(AuthContext);
    const removeHandler = (props) => {
        authCtx.removeExpense(props.id);
    };

    // console.log(props)

    const editHandler = (props) => {
        authCtx.showEdit(props.id);
    };

    return (
        <Fragment>
            <div key={props.id} className={classes.item}>
                <span className={classes.type}>{props.category}</span>
                <span className={classes.amount}>Rs. {props.amount}</span>
                <span className={classes.description}>{props.description}</span>
                <div className={classes.button}>
                    <button onClick={editHandler}>Edit</button>
                    <button onClick={removeHandler}>Delete</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ExpenseItems;