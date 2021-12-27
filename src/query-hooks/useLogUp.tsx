import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import axiosClient from '../axiosClient';
import { UserLogin } from '../Commons/interface';

function postLogupAPI(user: UserLogin): any {
  return axiosClient.post('/auth/register', user);
}
const useLogUp = (
  onSuccess: (data: AxiosResponse<any>, user: UserLogin) => void,
  onError: () => void
) => {
  return useMutation<any, any, any, any>(postLogupAPI, { onSuccess, onError });
};

export default useLogUp;
