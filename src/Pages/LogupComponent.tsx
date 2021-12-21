import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axiosClient from '../axiosClient';
import { UserLogin } from '../commons/interface';
import { AxiosResponse } from 'axios';
import { setToken } from '../commons/storage';
import { useHistory } from 'react-router-dom';

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

const LogupComponent = ({
  setUser,
}: {
  setUser: (user: UserLogin | null) => void;
}) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: 'nilson@emsail.com',
      password: 'nilsson',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res: AxiosResponse<any> = await postLogupAPI(values);
      const { data, status } = res;
      if (status === 200) {
        setUser(values);
        setToken(data['access_token']);
        history.push('/');
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
        <Button color='primary' variant='contained' fullWidth type='submit'>
          register
        </Button>
      </form>
    </div>
  );
};

export default LogupComponent;
