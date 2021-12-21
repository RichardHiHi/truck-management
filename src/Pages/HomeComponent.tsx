import { Button } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginTop: '200px',
    },
  })
);

const HomeComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        variant='contained'
        onClick={() => {
          history.push('/vehicle');
        }}
      >
        Vehicle Information
      </Button>
    </div>
  );
};

export default HomeComponent;
