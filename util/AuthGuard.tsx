import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import useStore from '../store/studentStore';
import Login from '../app/login';
import axios from 'axios';
import apiRoutes from './APIRoutes';
import RefreshToken from './RefreshToken';

const AuthGuard = (props: any) => {
  const { user } = useStore();

  RefreshToken();

  if (!user || Object.keys(user).length === 0) {
    return <Login />;
  } else {
    return <>{props.children}</>;
  }
};

export default AuthGuard;
