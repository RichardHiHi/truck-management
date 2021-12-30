import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { IToken, UserLogin } from '../Commons/interface';
import { setEmail, setToken } from '../Commons/storage';
import TextFieldFormik from '../Component/TextFieldFormik';
import useLogUp from '../Query-hooks/useLogUp';

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

const LogupComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const onSuccess = (data: AxiosResponse<IToken>, userForlogin: UserLogin) => {
    console.log(data);
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
