import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import axiosClient from '../axiosClient';
import { IToken, UserLogin } from '../Commons/interface';

function postLogupAPI(user: UserLogin): Promise<AxiosResponse<IToken>> {
  return axiosClient.post('/auth/register', user);
}
const useLogUp = (
  onSuccess: (data: AxiosResponse<IToken>, user: UserLogin) => void,
  onError: () => void
) => {
  return useMutation(postLogupAPI, { onSuccess, onError });
};

export default useLogUp;
