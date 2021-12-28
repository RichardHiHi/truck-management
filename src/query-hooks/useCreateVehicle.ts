import { useMutation } from 'react-query';
import { IVehicle } from './../Commons/interface';
import axiosClient from '../axiosClient';

const useCreateVehicle = (onSuccess: () => void) => {
  return useMutation(
    (vehicle: IVehicle) => {
      return axiosClient.post(`/products`, vehicle);
    },
    {
      onSuccess,
    }
  );
};
export default useCreateVehicle;
