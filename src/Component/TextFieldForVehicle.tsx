import { StyledComponentProps, TextField } from '@material-ui/core';
import React from 'react';
import { IVehicle, UserLogin } from '../Commons/interface';
import { FormikProps } from 'formik';

interface IProps {
  formik: FormikProps<IVehicle>;
  fieldName: keyof IVehicle;
  type?: React.InputHTMLAttributes<unknown>['type'];
  fullWidth?: boolean;
  multiline?: boolean;
  classField?: string;
  row?: number;
}

const TextFieldForVehicle = ({
  formik,
  fieldName,
  type,
  fullWidth,
  multiline,
  classField,
  row,
}: IProps) => {
  return (
    <TextField
      className={classField}
      fullWidth={fullWidth}
      multiline={multiline}
      id={fieldName}
      name={fieldName}
      label={fieldName}
      type={type}
      rows={row}
      value={formik.values[fieldName]}
      onChange={formik.handleChange}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
    />
  );
};

export default TextFieldForVehicle;
