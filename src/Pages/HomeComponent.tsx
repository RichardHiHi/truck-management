import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginTop: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      width: '250px',
      margin: '10px',
    },
  })
);

const HomeComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant='contained'
        onClick={() => {
          history.push('/vehicle');
        }}
      >
        Vehicle Information
      </Button>
      <Button
        className={classes.button}
        variant='contained'
        onClick={() => {
          history.push('/covid-track');
        }}
      >
        Covid Track
      </Button>
    </div>
  );
};

export default HomeComponent;
