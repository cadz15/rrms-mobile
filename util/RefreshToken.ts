import { useEffect } from 'react';
import useStore from '../store/studentStore';
import axios from 'axios';
import apiRoutes from './APIRoutes';

export default () => {
  const {
    _token,
    _tokenExpire,
    setUser,
    setToken,
    setTokenExpire,
    isRefreshingToken,
    setIsRefreshingToken,
  } = useStore();
  const source = axios.CancelToken.source();

  useEffect(() => {
    console.log(`checking  token`);

    if (_token !== '' && _tokenExpire < Date.now() && !isRefreshingToken) {
      setIsRefreshingToken(true);

      axios
        .post(
          apiRoutes.refresh,
          {},
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${_token}`,
            },
            cancelToken: source.token,
          },
        )
        .then((response) => {
          console.log(response.data);

          if (response.status === 200) {
            setToken(response.data.access_token);
            setTokenExpire(Date.now() + 3600000);
            setIsRefreshingToken(false);
          }
        })
        .catch((error) => {
          console.log('Token Expire');
          setToken('');
          setUser(null);
          setTokenExpire(0);
          setIsRefreshingToken(false);
        });
    }
  }, [_tokenExpire < Date.now()]);
};
