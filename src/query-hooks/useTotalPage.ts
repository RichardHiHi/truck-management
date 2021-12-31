import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';

const getAllVehicle = (): Promise<AxiosResponse<IVehicle[]>> => {
  return axiosClient.get(`/products`);
};

const useTotalPage = (PER_PAGE: number) => {
  return useQuery(['total-page'], getAllVehicle, {
    select: (data: AxiosResponse<IVehicle[]>) => {
      const count = Math.ceil(data.data.length / PER_PAGE);
      return count;
    },
  });
};

export default useTotalPage;
