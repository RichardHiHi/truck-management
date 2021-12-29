import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { IVehicle } from '../Commons/interface';
import { validationSchema } from '../Commons/storage';
import VehicleFormComponent from '../Component/VehicleFormComponent';
import useCreateVehicle from '../Query-hooks/useCreateVehicle';

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

// const validationSchema = yup.object({
//   TruckPlate: yup
//     .string()
//     .required('* TruckPlate is required')
//     .matches(
//       /^[0-9]{2}[A-Z]-[0-9]{4,5}$/g,
//       'TruckPlate is not valid(30A-12345 or 30A-1234)'
//     ),
//   CargoType: yup.array().min(1).required('* CargoType is required'),
//   Driver: yup.string().trim().required('* Driver is required'),
//   TruckType: yup
//     .number()
//     .min(10, 'TruckType Must be more than 10 ton')
//     .max(100, 'TruckType Must be less than 100 ton')
//     .required('* TruckType is required'),

//   Price: yup
//     .number()
//     .min(1, 'Price Must be more than 0')
//     .required('* Price is required'),
//   Dimension: yup
//     .string()
//     .trim()
//     .required('* Dimension is required')
//     .matches(
//       /^\d\d?(\.\d)?-\d(\.\d)?-\d(\.\d)?$/g,
//       'Dimension is not valid(10-1-1 or 10.5-1.5-2.5)'
//     ),
//   ParkingAddress: yup
//     .string()
//     .trim()
//     .min(10, 'ParkingAddress must be at least 10 characters')
//     .required('* ParkingAddress is required'),
//   ProductionYear: yup
//     .number()
//     .max(2021, 'ProductionYear Must be from 1999 to 2021')
//     .min(1999, 'ProductionYear Must be from 1999 to 2021')
//     .required('* ProductionYear is required'),
//   Status: yup.string().trim().required('* Status is required'),
//   Description: yup.string().trim().required('* Description is required'),
// });

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
  marginTop: {
    marginTop: '30px',
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
          TruckPlate: '',
          CargoType: [],
          Driver: '',
          TruckType: 0,
          Price: 0,
          Dimension: '',
          ParkingAddress: '',
          ProductionYear: '',
          Status: 'In-used',
          Description: '',
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

            <VehicleFormComponent props={props} />

            <Button
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
              className={classes.marginTop}
            >
              Create
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateVehicleComponent;
