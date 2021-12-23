import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { Field, Formik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useCovid } from '../query-hooks/useCovid';
import * as Yup from 'yup';
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryAxis,
} from 'victory';

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
  chart: {
    // width: '1000px',
    // height: '400px',
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
          mounth: Yup.string().required('Required'),
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
        <div className={classes.chart}>
          <VictoryChart
            animate={{
              duration: 500,
              onLoad: { duration: 200 },
            }}
          >
            {chartType ? (
              <VictoryBar
                barWidth={50}
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
                    strokeWidth: ({ data }) => data.length,
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
