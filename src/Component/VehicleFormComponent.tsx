import { makeStyles } from '@material-ui/core/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FormikProps } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { IVehicle } from '../Commons/interface';
import useDriverName from '../Query-hooks/useDriverName';
import MultiSelect from './MultiSelect';
import TextFormikField from './TextFormikField';

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
const VehicleFormComponent = ({ props }: Iprops) => {
  const classes = useStyles();
  const { data } = useDriverName();
  return (
    <>
      {/* <Autocomplete
        fullWidth
        freeSolo
        includeInputInList
        id='contact-autocomplete'
        options={data ? data : []}
        onChange={(name, value) => {
          props.setFieldValue('Driver', value);
        }}
        value={props.values.Driver}
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
      /> */}
      <hr />
      <TextFormikField fullWidth name='TruckPlate' />
      <hr />
      <div className={classes.wrapper}>
        <TextFormikField
          name='Price'
          type={'number'}
          classField={classes.marginLeft}
        />

        <TextFormikField name='Dimension' classField={classes.marginLeft} />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box>
            <DatePicker
              inputFormat='yyyy'
              views={['year']}
              label='Year'
              minDate={new Date('2012')}
              maxDate={new Date('2021')}
              value={new Date(props.values.ProductionYear.toString())}
              onChange={(year) => {
                props.setFieldValue('ProductionYear', moment(year).year());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    props.touched.ProductionYear &&
                    Boolean(props.errors.ProductionYear)
                  }
                  helperText={
                    props.touched.ProductionYear && props.errors.ProductionYear
                  }
                  variant='standard'
                />
              )}
            />
          </Box>
        </LocalizationProvider>
      </div>
      <hr />
      <TextFormikField fullWidth name='ParkingAddress' />
      <hr />
      <TextFormikField multiline fullWidth name='Description' row={5} />
      <hr />
      <div className={classes.wrapper}>
        <TextFormikField
          name='TruckType'
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
      <MultiSelect props={props} />
    </>
  );
};

export default VehicleFormComponent;
