import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { IVehicle } from '../Commons/interface';

const getVehicleByPage = async (page = 0) => {
  const res: AxiosResponse<IVehicle[]> = await axiosClient.get(
    `/products?_page=${page}&_limit=2`
  );
  return res.data;
};

const useVehicle = (page = 0, onSuccess: () => void) => {
  return useQuery(['vehicle', page], () => getVehicleByPage(page), {
    keepPreviousData: true,
    onSuccess,
  });
};

export default useVehicle;
