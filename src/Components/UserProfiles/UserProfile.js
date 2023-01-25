import React from 'react';
import classes from './UserProfile.module.css';
import UserProfileForm from './UserProfileForm';


const UserProfile = () => {

  return (
    <React.Fragment>
      <div className={classes.mainProfile}>
        <span className={classes.welcome}>
        Beware of little expenses. A small leak will sink a great ship.
        </span>
        <span className={classes.profile}>
          <span>
            Your profile is <b>64%</b> completed. A complete profile has a
            higher chance of landing a job.<b> Complete now</b>
          </span>
        </span>
      </div>
      <UserProfileForm />
    </React.Fragment>
  );
};

export default UserProfile;