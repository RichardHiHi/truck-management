import { useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';
import { AxiosResponse } from 'axios';

const getSingleVehicle = (id: string) => {
  return axiosClient.get(`/products/${id}`);
};

const useSingleVehicle = (
  id: string,
  onSuccess: (data: AxiosResponse<IVehicle>) => void
) => {
  return useQuery(['single-vehicle', id], () => getSingleVehicle(id), {
    onSuccess,
  });
};

export default useSingleVehicle;
