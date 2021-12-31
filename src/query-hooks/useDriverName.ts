import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { IDriverName } from '../Commons/interface';

const getDriverName = (): Promise<AxiosResponse<IDriverName[]>> => {
  return axiosClient.get('/families');
};

const useDriverName = () => {
  return useQuery('driverName', getDriverName, {
    select: (data: AxiosResponse<IDriverName[]>) => {
      const newData = data.data.map((item) => {
        return item.label;
      });
      return newData;
    },
  });
};

export default useDriverName;
