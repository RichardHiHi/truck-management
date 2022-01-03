import { StyledComponentProps, TextField } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { IVehicle, UserLogin } from '../Commons/interface';
import { FormikProps, useField, useFormikContext } from 'formik';

interface IProps {
  name: keyof IVehicle | keyof UserLogin;
  type?: React.InputHTMLAttributes<unknown>['type'];
  fullWidth?: boolean;
  multiline?: boolean;
  classField?: string;
  row?: number;
}

const TextFormikField = ({
  type,
  fullWidth,
  multiline,
  classField,
  row,
  ...props
}: IProps) => {
  const [field, meta] = useField(props);
  const { name, value, onChange } = field;
  const { error, touched } = meta;
  return (
    <TextField
      className={classField}
      fullWidth={fullWidth}
      multiline={multiline}
      id={name}
      name={name}
      label={name}
      type={type}
      rows={row}
      value={value}
      onChange={onChange}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  );
};

export default TextFormikField;
