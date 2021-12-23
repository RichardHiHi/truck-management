import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { useQuery } from 'react-query';
import { ICovid } from '../commons/interface';

function postLoginAPI(country: String, mounth: number): any {
  return axios.get(
    `https://api.covid19api.com/country/${country}/status/confirmed?from=2020-${mounth}-01T00:00:00Z&to=2020-${mounth}-30T00:00:00Z`
  );
}

const select = (data: any): any => {
  const newData: any = data.data.map((item: ICovid, index: number) => {
    const date = moment(item.Date).date();
    if (index % 2 === 0) {
      return { y: item.Cases, x: date };
    }
    return undefined;
  });

  return newData.filter((item: any) => item !== undefined);
};

export const useCovid = (country: String, mounth: number) => {
  return useQuery<ICovid[]>(
    ['covid', country, mounth],
    () => postLoginAPI(country, mounth),
    {
      select,
    }
  );
};
