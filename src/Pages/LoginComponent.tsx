import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { AxiosResponse } from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axiosClient from '../axiosClient';
import { IToken, UserLogin } from '../Commons/interface';
import { setEmail, setToken } from '../Commons/storage';
import TextFormikField from '../Component/TextFormikField';
import { useLogin } from '../Query-hooks/useLogin';
// import useLogin from '../query-hooks/useLogin';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('* Email is not valid')
    .trim()
    .required('* Email is required'),
  password: yup
    .string()
    .trim()
    .required('* Password is required')
    .min(6, '* Password must be larger than 6 characters'),
});

function postLoginAPI(user: UserLogin) {
  return axiosClient.post('/auth/login', user);
}

interface IProp {
  setUser: (user: UserLogin | null) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
  },
  form: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: '30px',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: '30px',
    marginBottom: '50px',
  },
  pagination: {
    marginTop: '40px',
  },
}));

const LoginComponent = () => {
  const history = useHistory();
  const classes = useStyles();
  const onSuccess = (data: AxiosResponse<IToken>, userForlogin: UserLogin) => {
    setEmail(userForlogin.email);
    setToken(data.data['access_token']);
    history.push('/');
  };

  const onError = () => {
    alert('Error');
  };

  const { mutate: loginAction } = useLogin(onSuccess, onError);
  return (
    <Formik
      initialValues={{
        email: 'nilson@emsail.com',
        password: 'nilsson',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        loginAction(values);
      }}
    >
      {(props) => (
        <div className={classes.root}>
          <h2 className={classes.text}>Login</h2>
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <TextFormikField name='email' type={'email'} fullWidth />

            <TextFormikField name='password' type={'password'} fullWidth />

            <Button
              fullWidth
              color='primary'
              variant='contained'
              type='submit'
              className={classes.button}
            >
              login
            </Button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default LoginComponent;
