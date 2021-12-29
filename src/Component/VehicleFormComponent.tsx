import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormikProps } from 'formik';
import { IVehicle } from '../Commons/interface';
import TextFieldForVehicle from './TextFieldForVehicle';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useQueries, useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import useDriverName from '../Query-hooks/useDriverName';

const options = [
  {
    label: 'vegetable',
    value: 'vegetable',
  },
  {
    label: 'gold',
    value: 'gold',
  },
  {
    label: 'tree',
    value: 'tree',
  },
];

interface Iprops {
  props: FormikProps<IVehicle>;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  wrapper: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  marginLeft: {
    marginRight: '20px',
  },
  marginTop: {
    marginTop: '30px',
  },
  text: {
    alignSelf: 'center',
    fontSize: '40px',
  },
}));
const ddd = ['The Godfather', 'Pulp Fiction'];
const VehicleFormComponent = ({ props }: Iprops) => {
  const classes = useStyles();
  const { data } = useDriverName();

  return (
    <>
      <Autocomplete
        fullWidth
        freeSolo
        includeInputInList
        id='contact-autocomplete'
        options={data ? data : []}
        onChange={(name, value) => {
          props.setFieldValue('Driver', value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(props.touched.Driver && props.errors.Driver)}
            fullWidth
            onChange={props.handleChange}
            helperText={props.touched.Driver && props.errors.Driver}
            label='Driver Name'
            name='Driver'
            variant='standard'
          />
        )}
      />
      <hr />
      <TextFieldForVehicle formik={props} fullWidth fieldName={'TruckPlate'} />
      <hr />
      <div className={classes.wrapper}>
        <TextFieldForVehicle
          formik={props}
          fieldName={'Price'}
          type={'number'}
          classField={classes.marginLeft}
        />

        <TextFieldForVehicle
          formik={props}
          fieldName={'ProductionYear'}
          type={'number'}
          classField={classes.marginLeft}
        />

        <TextFieldForVehicle
          formik={props}
          fieldName={'Dimension'}
          classField={classes.marginLeft}
        />
      </div>
      <hr />
      <TextFieldForVehicle
        fullWidth
        formik={props}
        fieldName={'ParkingAddress'}
      />
      <hr />

      <TextFieldForVehicle
        multiline
        fullWidth
        formik={props}
        fieldName={'Description'}
        row={5}
      />
      <hr />

      <div className={classes.wrapper}>
        <TextFieldForVehicle
          formik={props}
          fieldName={'TruckType'}
          type={'number'}
          classField={classes.marginLeft}
        />

        <Box sx={{ maxWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='Status'>Status</InputLabel>
            <Select
              id='Status'
              name='Status'
              value={props.values.Status}
              label='Status'
              onChange={props.handleChange}
              error={props.touched.Status && Boolean(props.errors.Status)}
            >
              <MenuItem value={'In-used'}>In-used</MenuItem>
              <MenuItem value={'New'}>New</MenuItem>
              <MenuItem value={'Suspended'}>Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <hr />

      <FormControl
        required
        error={props.touched.CargoType && Boolean(props.errors.CargoType)}
        component='fieldset'
      >
        <FormLabel component='legend'>Cargo type</FormLabel>
        <FormGroup>
          {options.map((option) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    name='CargoType'
                    checked={props.values.CargoType.includes(option.value)}
                    onChange={props.handleChange}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{props.errors.CargoType}</FormHelperText>
      </FormControl>
    </>
  );
};

export default VehicleFormComponent;
