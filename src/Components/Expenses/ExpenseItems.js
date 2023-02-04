import React, { Fragment } from 'react';
import classes from './ExpenseItems.module.css';

const ExpenseItems = (props) => {

    const removeHandler = async() => {
        try{
          const res = await fetch(`https://expense-tracker-186ef-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json`,{
            method: 'DELETE'
          })
          const data = await res.json();
          if(res.ok) {
            props.deleted(props.item)
          } else {
            throw data.error;
          }
        }
        catch(err) {
          console.log(err.message)
        }
      }

    // console.log(props)

    const editHandler = async() => {
        try{
          const res = await fetch(`https://expense-tracker-186ef-default-rtdb.firebaseio.com/${props.emailUrl}expenses/${props.item.id}.json`,{
            method: 'DELETE'
          })
          const data = await res.json();
          if(res.ok) {
            props.edit(props.item)
          } else {
            throw data.error;
          }
        }
        catch(err) {
          console.log(err.message)
        }
      }

    return (
        <Fragment>
            <div key={props.id} className={classes.item}>
                <span className={classes.type}>{props.item.category}</span>
                <span className={classes.amount}>Rs. {props.item.amount}</span>
                <span className={classes.description}>{props.item.description}</span>
                <div className={classes.button}>
                    <button onClick={editHandler}>Edit</button>
                    <button onClick={removeHandler}>Delete</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ExpenseItems;