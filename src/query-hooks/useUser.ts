import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { UserLogin } from '../Commons/interface';
import { getEmail } from '../Commons/storage';

function getUserByEmailAPI(
  email: string | null
): Promise<AxiosResponse<UserLogin[]>> {
  return axiosClient.get(`/locations?q=${email}`);
}

export function useUser() {
  const email = getEmail();
  return useQuery(['user', email], () => getUserByEmailAPI(email), {
    enabled: !!email,
  });
}
