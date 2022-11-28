import React from 'react';

import {useStyles} from './styles';

const MyProfile = () => {
  const classes = useStyles();

  return <div className={classes.root}>MyProfile</div>;
};

export default MyProfile;
