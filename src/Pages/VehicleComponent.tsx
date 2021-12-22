import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosClient from '../axiosClient';
import { getToken } from '../commons/storage';
import { Axios, AxiosResponse } from 'axios';
import { IVehicle } from '../commons/interface';
import { useMutation, useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Button, makeStyles } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useHistory } from 'react-router-dom';

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
  const [page, setPage] = useState(0);
  const PER_PAGE = 2;
  const [count, setCount] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  const getVehicleByPage = async (page = 0) => {
    const res: AxiosResponse<IVehicle[]> = await axiosClient.get(
      `/products?_page=${page}&_limit=2`
    );
    return res.data;
  };

  const {
    isLoading,
    isError,
    error,
    data: vehicles,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery(['vehicle', page], () => getVehicleByPage(page), {
    keepPreviousData: true,
  });

  const mutation = useMutation(
    (id: number) => {
      return axiosClient.delete(`/products/${id}`);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cargo Type</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Truck Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Dimension (L-W-H)</TableCell>
              <TableCell>Parking Address</TableCell>
              <TableCell>Production Year</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles?.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>
                  {vehicle.CargoType.map((item) => `${item} `)}
                </TableCell>
                <TableCell>{vehicle.Driver}</TableCell>
                <TableCell>{vehicle.TruckType}</TableCell>
                <TableCell>{vehicle.Price}</TableCell>
                <TableCell>{vehicle.Dimension}</TableCell>
                <TableCell>{vehicle.ParkingAddress}</TableCell>
                <TableCell>{vehicle.ProductionYear}</TableCell>
                <TableCell>{vehicle.Status}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      history.push(`/create-vehicle/${vehicle.id}`);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      if (vehicle.id) {
                        mutation.mutate(vehicle.id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} className={classes.pagination}>
        <Pagination count={count} color='primary' onChange={handleChangePage} />
      </Stack>
    </div>
  );
}
