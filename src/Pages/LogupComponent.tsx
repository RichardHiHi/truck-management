import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axiosClient from '../axiosClient';
import { UserLogin } from '../Commons/interface';
import { AxiosResponse } from 'axios';
import { setEmail, setToken } from '../Commons/storage';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import useLogUp from '../Query-hooks/useLogUp';
import TextFieldFormik from '../Component/TextFieldFormik';

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

function postLogupAPI(user: UserLogin) {
  return axiosClient.post('/auth/register', user);
}

const LogupComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const onSuccess = (data: AxiosResponse<any>, userForlogin: UserLogin) => {
    setToken(data.data['access_token']);
    setEmail(userForlogin.email);
    history.push('/');
  };

  const onError = () => {
    alert('Error');
  };

  const { mutate: logUpAction } = useLogUp(onSuccess, onError);
  const formik = useFormik({
    initialValues: {
      email: 'nilson@emsail.com',
      password: 'nilsson',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      logUpAction(values);
    },
  });
  return (
    <div className={classes.root}>
      <h2 className={classes.text}>Register</h2>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextFieldFormik
          formik={formik}
          fieldName={'email'}
          type={'email'}
          fullWidth={true}
        />
        <TextFieldFormik
          formik={formik}
          fieldName={'password'}
          type={'password'}
          fullWidth={true}
        />
        <Button
          color='primary'
          variant='contained'
          fullWidth
          type='submit'
          className={classes.button}
        >
          register
        </Button>
      </form>
    </div>
  );
};

export default LogupComponent;
