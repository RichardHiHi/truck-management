import { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { useQuery, useMutation } from 'react-query';
import axiosClient from '../axiosClient';
import { UserLogin } from '../commons/interface';

function postLoginAPI(user: UserLogin): any {
  return axiosClient.post('/auth/login', user);
}

function getUserByEmailAPI(email: String): any {
  return axiosClient.get(`/locations?q=${email}`);
}

export const useLogin = (
  onSuccess: (data: AxiosResponse<any>, user: UserLogin) => void,
  onError: () => void
) => {
  return useMutation<any, any, any, any>(postLoginAPI, { onSuccess, onError });
};

export function useUser(email: String) {
  return useQuery<any>(['user', email], getUserByEmailAPI(email));
}
