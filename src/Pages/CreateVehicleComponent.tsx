import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, FormikProps } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
          TruckPlate: '30A1-50493',
          CargoType: [],
          Driver: 'nguyen trong thanh',
          TruckType: 13,
          Price: 1,
          Dimension: '10-2-1.5',
          ParkingAddress: 'dasdasdasdasdasdadadasdaa',
          ProductionYear: '2012',
          Status: 'In-used',
          Description: 'asdasdas',
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
