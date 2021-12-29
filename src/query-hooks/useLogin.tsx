import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { IToken, UserLogin } from '../Commons/interface';

function postLoginAPI(user: UserLogin): Promise<AxiosResponse<IToken>> {
  return axiosClient.post('/auth/login', user);
}

export const useLogin = (
  onSuccess: (data: AxiosResponse<IToken>, user: UserLogin) => void,
  onError: () => void
) => {
  return useMutation(postLoginAPI, { onSuccess, onError });
};
