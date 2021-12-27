import { Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { default as React, default as React } from 'react';

interface props {
  array: unknown[];
}

const TableComponent = ({ array }: props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {Object.keys(array).map((item) => {
                return <TableCell>{item}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {array?.map((vehicle) => (
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
                  {/* <Button
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
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
