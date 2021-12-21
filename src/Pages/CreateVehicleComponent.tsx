import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axiosClient from '../axiosClient';
import { IVehicle, UserLogin } from '../commons/interface';
import { AxiosResponse } from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setToken } from '../commons/storage';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useMutation } from 'react-query';

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
      Description: '',
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
