import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import { ScrollView } from 'tamagui';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeLineItem from '../../components/TimeLineItem';
import RequestedListItem from '../../components/RequestedListItem';
import RequestedItemList from '../../components/RequestedItemList';
import useStore from '../../store/studentStore';
import RequestInterface from '../../types/requestInterface';
import axios from 'axios';
import apiRoutes from '../../util/APIRoutes';

const RequestItem = () => {
  const [foundRequest, setFoundRequest] = useState<RequestInterface | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState('');
  const [reloadEffect, setReloadEffect] = useState(true);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { _token, requests, setRequests } = useStore();

  const handleCancelRequest = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setShowError('');

      await axios
        .post(
          apiRoutes.cancelRequest,
          { id },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${_token}`,
            },
          },
        )
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            setRequests(response.data.requests);
            setReloadEffect(true);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setShowError(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    if (reloadEffect) {
      setReloadEffect(false);
      setFoundRequest(
        requests.find(
          (request: RequestInterface) => request.id === parseInt(id),
        ),
      );

      console.log(requests.find(
        (request: RequestInterface) => request.id === parseInt(id),
      ));
      
    }
  }, [id, reloadEffect]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ gap: 10 }}>
        {showError !== '' && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: Colors.danger,
                marginBottom: 10,
                paddingBottom: 10,
                paddingTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
          >
            <Ionicons name="warning" size={24} color={'#fff'} />
            <Text style={{ fontSize: 18, fontFamily: 'mon-sb', color: '#fff' }}>
              {' '}
              {showError}
            </Text>
          </View>
        )}
        <View style={styles.card}>
          <View
            style={{
              paddingBottom: 10,
              borderBottomColor: Colors.secondary,
              borderBottomWidth: 1,
              borderStyle: 'dashed',
            }}
          >
            <Text style={styles.cardTitle}>
              Request Id -{' '}
              <Text style={{ color: Colors.primary }}>
                {foundRequest?.reference_number}
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: 'mon',
                fontSize: 16,
                color: Colors.secondaryLight,
              }}
            >
              {foundRequest?.date}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { paddingBottom: 15 }]}>
          {showAll ? (
            foundRequest?.statuses?.map((status) => (
              <TimeLineItem
                title={status.status}
                detail={status.details}
                link={status.checkout_url}
                date={status.date}
                completed={status.is_completed}
                key={status.id}
              />
            ))
          ) : (
            <TimeLineItem
              title={foundRequest?.statuses?.[0]?.status}
              detail={foundRequest?.statuses?.[0]?.details}
              link={foundRequest?.statuses?.[0]?.checkout_url}
              date={foundRequest?.statuses?.[0]?.date}
              completed={foundRequest?.statuses?.[0]?.is_completed}
              key={foundRequest?.statuses?.[0]?.id}
            />
          )}

          <View>
            <TouchableOpacity onPress={() => setShowAll(!showAll)}>
              <Text style={{ textAlign: 'center', color: Colors.primary }}>
                {showAll ? '^ Hide' : '˅ Show'} Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <RequestedItemList total={foundRequest?.amount}>
          {foundRequest ? (
            foundRequest?.items?.map((item) => (
              <RequestedListItem
                itemName={item.name}
                amount={item.price}
                quantity={item.quantity}
                key={item.id}
              />
            ))
          ) : (
            <Text>No Item found!</Text>
          )}
        </RequestedItemList>

        {foundRequest?.status === 'PENDING FOR REVIEW' && (
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: Colors.danger,
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={handleCancelRequest}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  fontFamily: 'mon-sb',
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#fff',
                }}
              >
                Cancel Request
              </Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginBottom: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardTitle: {
    fontFamily: 'mon-sb',
    fontSize: 20,
  },
  cardAmount: {
    fontFamily: 'mon-sb',
    fontSize: 18,
    color: Colors.success,
  },
  cardBadge: {
    fontFamily: 'mon-b',
    fontSize: 13,
    color: Colors.danger,
    width: '50%',
  },
});
export default RequestItem;
