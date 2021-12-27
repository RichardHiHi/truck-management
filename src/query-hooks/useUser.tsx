import { useQuery } from 'react-query';
import axiosClient from '../axiosClient';
import { getEmail } from '../Commons/storage';

function getUserByEmailAPI(email: string | null): any {
  return axiosClient.get(`/locations?q=${email}`);
}

export function useUser() {
  const email = getEmail();
  return useQuery<any>(['user', email], () => getUserByEmailAPI(email), {
    enabled: !!email,
  });
}
