import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import { ScrollView } from 'tamagui';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeLineItem from '../../components/TimeLineItem';
import RequestedListItem from '../../components/RequestedListItem';
import RequestedItemList from '../../components/RequestedItemList';

const RequestItem = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO get data from API
  return (
    <View style={styles.container}>
      <ScrollView style={{ gap: 10 }}>
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
              <Text style={{ color: Colors.primary }}>240113000000301</Text>
            </Text>
            <Text
              style={{
                fontFamily: 'mon',
                fontSize: 16,
                color: Colors.secondaryLight,
              }}
            >
              Wed January 29, 2020
            </Text>
          </View>
        </View>

        <View style={[styles.card, { paddingBottom: 15 }]}>
          <TimeLineItem />
          <TimeLineItem />

          <View>
            <TouchableOpacity>
              <Text style={{ textAlign: 'center', color: Colors.primary }}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <RequestedItemList total={100}>
          <RequestedListItem
            itemName="Transcript of Record"
            amount={300}
            quantity={1}
          />
          <RequestedListItem itemName="T.O.R" amount={275} quantity={2} />
        </RequestedItemList>
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
