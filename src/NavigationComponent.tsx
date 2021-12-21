import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { clearToken, getToken } from './commons/storage';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UserLogin } from './commons/interface';

// const styles = createStyles({
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
//   link: {
//     color: 'white',
//     textDecoration: 'none',
//   },
// });

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

function NavigationComponent({
  user,
  setUser,
}: {
  user: UserLogin | null;
  setUser: (user: UserLogin | null) => void;
}) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
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
                {user?.email}
              </Button>
              <Button
                color='inherit'
                onClick={() => {
                  setUser(null);
                  clearToken();
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
