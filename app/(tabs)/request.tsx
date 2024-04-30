import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import RequestListItem from '../../components/RequestListItem';
import apiRoutes from '../../util/APIRoutes';
import axios from 'axios';
import useStore from '../../store/studentStore';
import RequestInterface from '../../types/requestInterface';
import Colors from '../../constants/Colors';
import RefreshToken from '../../util/RefreshToken';
import { useIsFocused } from '@react-navigation/native';

const Request = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefeshing, setIsRefeshing] = useState(true);
  const { _token, requests, setRequests } = useStore();
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const isFocused = useIsFocused();

  RefreshToken();

  useEffect(() => {
    if (isRefeshing || isFocused) {
      if (!isLoading) {
        setIsLoading(true);

        axios
          .post(
            apiRoutes.requests,
            {},
            {
              signal: abortControllerRef.current.signal,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${_token}`,
              },
            },
          )
          .then((response) => {
            if (response.status === 200) {
              setRequests(response.data.requests);
              setIsLoading(false);
              setIsRefeshing(false);
            }
          })
          .catch((error) => {
            if (error?.response) {
              console.log(error.response);
            }
          });
      }
    }

    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, [isRefeshing, isFocused]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => setIsRefeshing(true)}
        />
      }
    >
      <View style={styles.container}>
        {requests ? (
          requests?.map((request: RequestInterface) => {
            return (
              <RequestListItem
                id={request.id}
                title={request.title}
                status={request.status}
                date={request.date}
                amount={request.amount}
                textColor={request.status === 'DECLINED' ? 'danger' : 'primary'}
                key={request.id}
              />
            );
          })
        ) : (
          <Text style={styles.empty}>No requests found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  empty: {
    fontSize: 18,
    fontFamily: 'mon-sb',
    color: Colors.secondaryLight,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Request;
