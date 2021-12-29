import { useMutation } from 'react-query';
import { IVehicle } from '../Commons/interface';
import axiosClient from '../axiosClient';
import { AxiosResponse } from 'axios';

const editVehicleAPI = ({
  vehicle,
  id,
}: {
  vehicle: IVehicle;
  id: string;
}): Promise<AxiosResponse<IVehicle[]>> => {
  return axiosClient.patch(`/products/${id}`, vehicle);
};

const useEditVehice = (onSuccess: () => void) => {
  return useMutation(editVehicleAPI, {
    onSuccess,
  });
};

export default useEditVehice;
