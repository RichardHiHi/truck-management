import { Button, makeStyles } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';
import PaginationComponent from '../Component/PaginationComponent';
import TableComponent from '../Component/TableComponent';
import useTotalPage from '../Query-hooks/useTotalPage';
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
  const history = useHistory();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries('total-page');
  const { isLoading, isError, data: vehicles } = useVehicle(page, onSuccess);
  const { data: totalPage } = useTotalPage(PER_PAGE);

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
      {totalPage && (
        <PaginationComponent
          count={totalPage}
          classPagination={classes.pagination}
          setPage={setPage}
        />
      )}
    </div>
  );
}
