import Button from '@material-ui/core/Button';
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
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';
import TextFieldForVehicle from '../Component/TextFieldForVehicle';
import useCreateVehicle from '../Query-hooks/useCreateVehicle';

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
  // CargoType: yup.string().required('* CargoType is required'),
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
  const history = useHistory();
  const classes = useStyles();
  const onSuccess = () => history.push('/vehicle');

  const { mutate: createVehicleAction } = useCreateVehicle(onSuccess);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
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
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          createVehicleAction(values);
        }}
      >
        {(props: FormikProps<IVehicle>) => (
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <h2 className={classes.text}>Create Vehicle</h2>
            <TextFieldForVehicle
              formik={props}
              fullWidth
              fieldName={'TruckPlate'}
            />
            <hr />
            <TextFieldForVehicle
              formik={props}
              fullWidth
              fieldName={'Driver'}
            />
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
              Create
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateVehicleComponent;
