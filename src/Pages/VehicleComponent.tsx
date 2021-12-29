import { Button, makeStyles } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';
import PaginationComponent from '../Component/PaginationComponent';
import TableComponent from '../Component/TableComponent';
import useVehicle from '../Query-hooks/useVehicle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '200px',
    marginBottom: '30px',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: '35px',
  },
  pagination: {
    marginTop: '40px',
  },
}));

export default function VehicleComponent() {
  const PER_PAGE = 2;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  const { isLoading, isError, data: vehicles } = useVehicle(page);

  useEffect(() => {
    const getTotalPages = async () => {
      const res: AxiosResponse<IVehicle[]> = await axiosClient.get(`/products`);
      const count = Math.ceil(res.data.length / PER_PAGE);
      setCount(count);
    };
    getTotalPages();
  }, [vehicles]);

  if (isError) {
    return <h2>Error....</h2>;
  }

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>Vehicle Information</h2>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={() => {
          history.push('/create-vehicle');
        }}
      >
        Create Vehicle
      </Button>

      {vehicles && (
        <TableComponent array={vehicles} uniqueKey={'id'}></TableComponent>
      )}
      <PaginationComponent
        count={count}
        classPagination={classes.pagination}
        setPage={setPage}
      />
    </div>
  );
}
