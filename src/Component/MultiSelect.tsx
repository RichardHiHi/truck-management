import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { FormikProps } from 'formik';
import { MenuProps as MenuPropsType } from '@material-ui/core/Menu';
import { FormHelperText, SelectProps } from '@material-ui/core';
import { IVehicle } from '../Commons/interface';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: '#f50057',
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps: Partial<MenuPropsType> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  variant: 'menu',
};

const options = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

interface Iprops {
  props: FormikProps<IVehicle>;
}

const MultiSelect = ({ props }: Iprops) => {
  const { values, setFieldValue, errors, touched } = props;
  const classes = useStyles();
  const isAllSelected =
    options.length > 0 && values.CargoType.length === options.length;

  const handleChange = (event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    console.log(value);
    if (value[value.length - 1] === 'all') {
      setFieldValue(
        'CargoType',
        values.CargoType.length === options.length ? [] : options
      );
      return;
    }
    setFieldValue('CargoType', value);
  };

  return (
    <FormControl
      error={Boolean(errors.CargoType) && touched.CargoType}
      className={classes.formControl}
    >
      <InputLabel id='mutiple-select-label'>Multiple Select</InputLabel>
      <Select
        labelId='mutiple-select-label'
        multiple
        name='CargoType'
        value={values.CargoType}
        onChange={handleChange}
        renderValue={(selected: any) => {
          return <>{selected.join(', ')}</>;
        }}
        MenuProps={MenuProps}
      >
        <MenuItem
          value='all'
          classes={{
            root: isAllSelected ? classes.selectedAll : '',
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                values.CargoType.length > 0 &&
                values.CargoType.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary='Select All'
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={values.CargoType.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
      {errors.CargoType && touched.CargoType && (
        <FormHelperText>{errors.CargoType}</FormHelperText>
      )}
    </FormControl>
  );
};

export default MultiSelect;
