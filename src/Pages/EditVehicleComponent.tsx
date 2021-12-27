import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axiosClient from '../axiosClient';
import { IVehicle, UserLogin } from '../Commons/interface';
import { AxiosResponse } from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setToken } from '../Commons/storage';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useMutation } from 'react-query';
import { TextareaAutosize } from '@material-ui/core';

const options = [
  {
    label: 'Uno',
    value: 'one',
  },
  {
    label: 'Dos',
    value: 'two',
  },
  {
    label: 'Tres',
    value: 'three',
  },
];

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
];

const validationSchema = yup.object({
  TruckPlate: yup.string().trim().required('* Email is required'),
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: '20px',
  },
}));

const CreateVehicleComponent = () => {
  const history = useHistory();
  const mutation = useMutation(
    (vehicle: IVehicle) => {
      return axiosClient.post(`/products`, vehicle);
    },
    {
      onSuccess: () => {
        history.push('/vehicle');
      },
    }
  );

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      TruckPlate: '30A-50492',
      CargoType: ['Computer'],
      Driver: 'theem',
      TruckType: 5,
      Price: 1000000000,
      Dimension: '10-2-1.5',
      ParkingAddress: 'No.128 Hoàn Kiếm, HN',
      ProductionYear: '2010',
      Status: 'In-used',
      Description: 'dasd',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='TruckPlate'
          name='TruckPlate'
          label='TruckPlate'
          value={formik.values.TruckPlate}
          onChange={formik.handleChange}
          error={formik.touched.TruckPlate && Boolean(formik.errors.TruckPlate)}
          helperText={formik.touched.TruckPlate && formik.errors.TruckPlate}
        />

        <TextField
          fullWidth
          id='Driver'
          name='Driver'
          label='Driver'
          value={formik.values.Driver}
          onChange={formik.handleChange}
          error={formik.touched.Driver && Boolean(formik.errors.Driver)}
          helperText={formik.touched.Driver && formik.errors.Driver}
        />

        <TextField
          type='number'
          id='TruckType'
          name='TruckType'
          label='TruckType'
          value={formik.values.TruckType}
          onChange={formik.handleChange}
          error={formik.touched.TruckType && Boolean(formik.errors.TruckType)}
          helperText={formik.touched.TruckType && formik.errors.TruckType}
        />

        <TextField
          id='Price'
          name='Price'
          label='Price'
          value={formik.values.Price}
          onChange={formik.handleChange}
          error={formik.touched.Price && Boolean(formik.errors.Price)}
          helperText={formik.touched.Price && formik.errors.Price}
          className={classes.marginLeft}
        />

        <TextField
          id='ProductionYear'
          name='ProductionYear'
          label='ProductionYear'
          value={formik.values.ProductionYear}
          onChange={formik.handleChange}
          error={
            formik.touched.ProductionYear &&
            Boolean(formik.errors.ProductionYear)
          }
          helperText={
            formik.touched.ProductionYear && formik.errors.ProductionYear
          }
          className={classes.marginLeft}
        />

        <TextField
          id='Dimension'
          name='Dimension'
          label='Dimension'
          value={formik.values.Dimension}
          onChange={formik.handleChange}
          error={formik.touched.Dimension && Boolean(formik.errors.Dimension)}
          helperText={formik.touched.Dimension && formik.errors.Dimension}
          className={classes.marginLeft}
        />

        <TextField
          fullWidth
          id='ParkingAddress'
          name='ParkingAddress'
          label='ParkingAddress'
          value={formik.values.ParkingAddress}
          onChange={formik.handleChange}
          error={
            formik.touched.ParkingAddress &&
            Boolean(formik.errors.ParkingAddress)
          }
          helperText={
            formik.touched.ParkingAddress && formik.errors.ParkingAddress
          }
        />

        <FormLabel component='legend'>Description</FormLabel>
        <TextareaAutosize
          id='Description'
          name='Description'
          value={formik.values.Description}
          onChange={formik.handleChange}
          aria-label='minimum height'
          minRows={5}
          placeholder='Minimum 5 rows'
          style={{ width: 300 }}
        />

        <Box sx={{ maxWidth: 120 }}>
          <FormLabel component='legend'>Status</FormLabel>
          <FormControl fullWidth>
            <InputLabel id='Status'>Status</InputLabel>
            <Select
              id='Status'
              name='Status'
              value={formik.values.Status}
              label='Status'
              onChange={formik.handleChange}
              error={formik.touched.Status && Boolean(formik.errors.Status)}
            >
              <MenuItem value={'In-used'}>In-used</MenuItem>
              <MenuItem value={'New'}>New</MenuItem>
              <MenuItem value={'Suspended'}>Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl component='fieldset'>
          <FormLabel component='legend'>Cargo Type</FormLabel>
          <FormGroup aria-label='position' row>
            <FormControlLabel
              value='Computer'
              name='CargoType'
              control={<Checkbox />}
              label='Computer'
              labelPlacement='top'
            />
            <FormControlLabel
              value='Electronics'
              control={<Checkbox />}
              label='Electronics'
              name='CargoType'
              labelPlacement='top'
            />
            <FormControlLabel
              value='Vegetables'
              control={<Checkbox />}
              label='Vegetables'
              name='CargoType'
              labelPlacement='top'
            />
            <FormControlLabel
              value='Kid toys'
              control={<Checkbox />}
              label='Kid toys'
              name='CargoType'
              labelPlacement='top'
            />
          </FormGroup>
        </FormControl>

        <Button color='primary' variant='contained' fullWidth type='submit'>
          login
        </Button>
      </form>
    </div>
  );
};

export default CreateVehicleComponent;
