import { TextField } from '@material-ui/core';
import React from 'react';
import { IVehicle, UserLogin } from '../Commons/interface';
import { FormikProps } from 'formik';

interface IProps {
  formik: FormikProps<UserLogin>;
  fieldName: keyof UserLogin;
  type: React.InputHTMLAttributes<unknown>['type'];
  fullWidth?: boolean;
  multiline?: boolean;
}

const TextFieldFormik = ({
  formik,
  fieldName,
  type,
  fullWidth,
  multiline,
}: IProps) => {
  return (
    <div>
      <TextField
        fullWidth={fullWidth}
        multiline={multiline}
        id={fieldName}
        name={fieldName}
        label={fieldName}
        type={type}
        value={formik.values[fieldName]}
        onChange={formik.handleChange}
        error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
        helperText={formik.touched[fieldName] && formik.errors[fieldName]}
      />
    </div>
  );
};

export default TextFieldFormik;
