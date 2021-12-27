import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { useQuery } from 'react-query';
import { ICovid } from '../Commons/interface';

function postLoginAPI(country: String, mounth: number): any {
  return axios.get(
    `https://api.covid19api.com/country/${country}/status/confirmed?from=2020-${mounth}-01T00:00:00Z&to=2020-${mounth}-30T00:00:00Z`
  );
}

const select = (data: any): any => {
  const newData: any = data.data.map((item: ICovid, index: number) => {
    const date = moment(item.Date).date();

    return { y: item.Cases, x: date };
  });
  if (newData.length > 0) {
    const dive5NewData = Math.ceil(newData.length / 5);
    const data5 = [
      newData[0],
      newData[dive5NewData],
      newData[dive5NewData * 2],
      newData[dive5NewData * 3],
      newData[newData.length - 1],
    ];
    return data5;
  }

  return newData;
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
