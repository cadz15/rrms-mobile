import { View, Text } from 'react-native';
import React from 'react';
import useStore from '../store/studentStore';
import Login from '../app/login';

const AuthGuard = (props: any) => {
  const { user } = useStore();

  if (!user || Object.keys(user).length === 0) {
    return <Login />;
  } else {
    return <>{props.children}</>;
  }
};

export default AuthGuard;
