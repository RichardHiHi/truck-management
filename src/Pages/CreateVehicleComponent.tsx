import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ErrorMessage, Field, FieldArray, useFormik } from 'formik';
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
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useMutation } from 'react-query';
import { TextareaAutosize } from '@material-ui/core';
import { useQuery } from 'react-query';

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
  TruckPlate: yup.string().required('* TruckPlate is required'),
  CargoType: yup.string().required('* CargoType is required'),
  Driver: yup.string().trim().required('* Driver is required'),
  TruckType: yup.string().trim().required('* TruckType is required'),
  Price: yup.string().trim().required('* Price is required'),
  Dimension: yup.string().trim().required('* Dimension is required'),
  ParkingAddress: yup.string().trim().required('* ParkingAddress is required'),
  ProductionYear: yup.string().trim().required('* ProductionYear is required'),
  Status: yup.string().trim().required('* Status is required'),
  Description: yup.string().trim().required('* Description is required'),
});

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
  text: {
    alignSelf: 'center',
    fontSize: '40px',
  },
}));

const CreateVehicleComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<IVehicle>({
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
  });

  const getVehicleByID = () => {
    return axiosClient.get(`/products/${id}`);
  };

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

  const patchMutation = useMutation(
    (vehicle: IVehicle) => {
      return axiosClient.patch(`/products/${id}`, vehicle);
    },
    {
      onSuccess: () => {
        history.push('/vehicle');
      },
    }
  );

  const classes = useStyles();

  useEffect(() => {
    const setInitialValue = async () => {
      const res: AxiosResponse<IVehicle> = await axiosClient.get(
        `/products/${id}`
      );
      setInitialValues(res?.data);
    };
    if (id) {
      setInitialValue();
    } else {
      setInitialValues({
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
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (id) {
        patchMutation.mutate(values);
        return;
      }
      mutation.mutate(values);
    },
  });
  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <h2 className={classes.text}>
          {id ? 'Update Vehicle' : 'Create Vehicle'}
        </h2>
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
        <hr />
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
        <hr />
        <div className={classes.wrapper}>
          <TextField
            type='number'
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
          />
        </div>
        <hr />
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
        <hr />
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

        {formik.errors.Description && formik.touched.Description ? (
          <div style={{ color: 'red' }}>{formik.errors.Description}</div>
        ) : null}
        <hr />
        <div className={classes.wrapper}>
          <TextField
            type='number'
            id='TruckType'
            name='TruckType'
            label='TruckType'
            value={formik.values.TruckType}
            onChange={formik.handleChange}
            error={formik.touched.TruckType && Boolean(formik.errors.TruckType)}
            helperText={formik.touched.TruckType && formik.errors.TruckType}
            className={classes.marginLeft}
          />

          <Box sx={{ maxWidth: 120 }}>
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
        </div>
        <hr />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Cargo Type</FormLabel>
          <hr />
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
        <hr />
        <Button color='primary' variant='contained' fullWidth type='submit'>
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  );
};

export default CreateVehicleComponent;
