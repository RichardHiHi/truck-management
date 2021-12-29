import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { clearAll, getToken } from './Commons/storage';
import { useUser } from './Query-hooks/useUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    link: {
      color: 'white',
      textDecoration: 'none',
    },
  })
);

function NavigationComponent() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { data } = useUser();
  const [tokenIn, setTokenIN] = useState<string>('');
  useEffect(() => {
    const token = getToken();
    if (token) {
      setTokenIN(token);
    } else {
      setTokenIN('');
    }
  }, [location.pathname]);
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' color='inherit' className={classes.grow}>
            <Link to='/' className={classes.link}>
              HOME
            </Link>
          </Typography>
          {!tokenIn ? (
            <>
              <Button
                color='inherit'
                onClick={() => {
                  history.push('/logup');
                }}
              >
                LOGUP
              </Button>
              <Button
                color='inherit'
                onClick={() => {
                  history.push('/login');
                }}
              >
                LOGIN
              </Button>
            </>
          ) : (
            <>
              <Button
                color='inherit'
                onClick={() => {
                  history.push('/detailUser');
                }}
              >
                {data && data.data[0].email}
              </Button>
              <Button
                color='inherit'
                onClick={() => {
                  clearAll();
                  history.push('/login');
                }}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationComponent;
