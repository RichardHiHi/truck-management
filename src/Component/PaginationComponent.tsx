import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface IProps {
  count: number;
  classPagination: string;
  setPage: (page: number) => void;
}

const PaginationComponent = ({ count, classPagination, setPage }: IProps) => {
  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <div>
      <Stack spacing={2} className={classPagination}>
        <Pagination count={count} color='primary' onChange={handleChangePage} />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
