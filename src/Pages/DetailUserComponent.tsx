import React from 'react';
import { UserLogin } from '../commons/interface';

const DetailUserComponent = ({ user }: { user: UserLogin | null }) => {
  return <div>{user && <h2>email : {user.email}</h2>}</div>;
};

export default DetailUserComponent;
