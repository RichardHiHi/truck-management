import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { UserLogin } from '../Commons/interface';

function postLoginAPI(user: UserLogin): any {
  return axiosClient.post('/auth/login', user);
}

export const useLogin = (
  onSuccess: (data: AxiosResponse<any>, user: UserLogin) => void,
  onError: () => void
) => {
  return useMutation<any, any, any, any>(postLoginAPI, { onSuccess, onError });
};
