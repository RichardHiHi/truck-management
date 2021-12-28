import { useMutation } from 'react-query';
import { IVehicle } from '../Commons/interface';
import axiosClient from '../axiosClient';

const editVehicleAPI = ({
  vehicle,
  id,
}: {
  vehicle: IVehicle;
  id: string;
}): any => {
  return axiosClient.patch(`/products/${id}`, vehicle);
};

const useEditVehice = (onSuccess: () => void) => {
  return useMutation(editVehicleAPI, {
    onSuccess,
  });
};

export default useEditVehice;
