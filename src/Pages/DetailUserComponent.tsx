import React from 'react';
import { UserLogin } from '../Commons/interface';
import { useUser } from '../Query-hooks/useUser';

const DetailUserComponent = () => {
  const { data } = useUser();
  return <div>{data && <h2>email : {data.data[0].email}</h2>}</div>;
};

export default DetailUserComponent;
