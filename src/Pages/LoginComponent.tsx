import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axiosClient from '../axiosClient';
import { UserLogin } from '../Commons/interface';
import { setEmail, setToken } from '../Commons/storage';
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
  const onSuccess = (data: AxiosResponse<any>, userForlogin: UserLogin) => {
    console.log('123');
    setEmail(userForlogin.email);
    setToken(data.data['access_token']);
    history.push('/');
  };

  const onError = () => {
    alert('Error');
  };

  const { mutate: loginAction, isSuccess } = useLogin(onSuccess, onError);

  const formik = useFormik({
    initialValues: {
      email: 'nilson@emsail.com',
      password: 'nilsson',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      loginAction(values);
    },
  });
  return (
    <div className={classes.root}>
      <h2 className={classes.text}>Login</h2>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
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
  );
};

export default LoginComponent;
