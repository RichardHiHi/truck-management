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
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosClient from '../axiosClient';
interface props {
  array: any[];
  uniqueKey: string;
}

const TableComponent = ({ array, uniqueKey }: props) => {
  const history = useHistory();
  const keyArray = Object.keys(array[0]);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: number) => {
      return axiosClient.delete(`/products/${id}`);
    },
    {
      onSuccess: () => {
        // refetch();
        queryClient.invalidateQueries('vehicle');
      },
    }
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {keyArray.map((item) => {
                return <TableCell>{item}</TableCell>;
              })}
              <TableCell>Feature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array?.map((item: any, index) => (
              <TableRow
                key={item[uniqueKey]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {keyArray.map((keyItem) => {
                  return <TableCell>{item[keyItem]}</TableCell>;
                })}

                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      history.push(`/create-vehicle/${item[uniqueKey]}`);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      if (item[uniqueKey]) {
                        mutation.mutate(item[uniqueKey]);
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
    </>
  );
};

export default TableComponent;
