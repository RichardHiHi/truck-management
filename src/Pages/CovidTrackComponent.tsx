import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryLine } from 'victory';
import * as Yup from 'yup';
import { useCovid } from '../Query-hooks/useCovid';

const countries = [
  'Guernsey',
  'Suriname',
  'Suriname',
  'Mauritania',
  'south-africa',
  'saint-martin-french-part',
];

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginLeft: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  marginRight: {
    marginRight: '20px',
  },
}));

const CovidTrackComponent = () => {
  const [country, setCountry] = useState('Malaysia');
  const [mounth, setMounth] = useState(1);
  const [chartType, setChartType] = useState(false);
  const classes = useStyles();
  const { data } = useCovid(country, mounth);

  return (
    <div>
      <h1 className={classes.text}>My Form</h1>
      <Formik
        initialValues={{ country: 'Guernsey', mounth: mounth }}
        onSubmit={(values) => {
          setCountry(values.country);
          setMounth(values.mounth);
        }}
        validationSchema={Yup.object({
          mounth: Yup.number()
            .min(1, 'please text the mounth')
            .max(12, 'please text the mounth')
            .required('Required'),
        })}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={classes.form}>
            <FormControl className={classes.marginRight}>
              <InputLabel id='country'>country</InputLabel>
              <Select
                id='country'
                name='country'
                value={props.values.country}
                label='country'
                onChange={props.handleChange}
                error={props.touched.country && Boolean(props.errors.country)}
              >
                {countries.map((country) => {
                  return <MenuItem value={country}>{country}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <TextField
              id='mounth'
              name='mounth'
              label='mounth'
              type='number'
              value={props.values.mounth}
              onChange={props.handleChange}
              error={props.touched.mounth && Boolean(props.errors.mounth)}
              helperText={props.touched.mounth && props.errors.mounth}
              className={classes.marginRight}
            />
            <Button color='primary' variant='contained' type='submit'>
              track
            </Button>
          </form>
        )}
      </Formik>

      <div className={classes.chartWrapper}>
        <div>
          <VictoryChart
            animate={{
              duration: 500,
              onLoad: { duration: 200 },
            }}
          >
            {chartType ? (
              <VictoryBar
                barWidth={10}
                style={{ data: { fill: 'blue' } }}
                data={data}
              />
            ) : (
              <VictoryLine
                data={data}
                height={900}
                interpolation='natural'
                style={{
                  data: {
                    stroke: '#c43a31',
                  },
                }}
              />
            )}
          </VictoryChart>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            variant='contained'
            onClick={() => {
              setChartType(true);
            }}
          >
            Chart Bar
          </Button>
          <Button
            className={classes.marginTop}
            variant='contained'
            onClick={() => {
              setChartType(false);
            }}
          >
            chart line
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CovidTrackComponent;
