import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AxiosResponse } from 'axios';
import { Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';
import { validationSchema } from '../Commons/storage';
import VehicleFormComponent from '../Component/VehicleFormComponent';
import useEditVehice from '../Query-hooks/useEditVehice';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
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

const EditVehicleComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<IVehicle>();
  const onSuccess = () => {
    history.push('/vehicle');
  };
  const { mutate: editAction } = useEditVehice(onSuccess);
  const classes = useStyles();

  useEffect(() => {
    const setInitialValue = async () => {
      const res: AxiosResponse<IVehicle> = await axiosClient.get(
        `/products/${id}`
      );
      setInitialValues(res?.data);
    };
    setInitialValue();
  }, []);

  return (
    <div className={classes.root}>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            if (id) {
              editAction({ vehicle: values, id: id });
            }
          }}
        >
          {(props: FormikProps<IVehicle>) => (
            <form onSubmit={props.handleSubmit} className={classes.form}>
              <h2 className={classes.text}>Edit Vehicle</h2>
              <VehicleFormComponent props={props} />
              <Button
                color='primary'
                variant='contained'
                fullWidth
                type='submit'
              >
                Edit
              </Button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditVehicleComponent;
