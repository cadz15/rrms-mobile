import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';

type PropTypes = {
  id: string | number;
  title: string;
  date: string;
  status: string;
  amount: string;
  textColor?: string;
};

const RequestListItem = (props: PropTypes) => {
  const textColor =
    props.textColor === 'danger' ? Colors.danger : Colors.primary;

  return (
    <View style={styles.card}>
      <View style={{ flex: 1, overflow: 'scroll' }}>
        <Link
          href={`request/${props.id}` as `http${string}`}
          style={{ flexDirection: 'row' }}
        >
          <View>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <Text
              style={{
                fontFamily: 'mon',
                fontSize: 12,
                color: Colors.secondaryLight,
              }}
            >
              {props.date}
            </Text>
            <Text style={[styles.cardBadge, { color: textColor }]}>
              {props.status}
            </Text>
          </View>
        </Link>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 100,
        }}
      >
        <Text style={styles.cardAmount}>{props.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    rowGap: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'mon-sb',
    fontSize: 18,
  },
  cardAmount: {
    fontFamily: 'mon-sb',
    fontSize: 18,
    color: Colors.success,
  },
  cardBadge: {
    fontFamily: 'mon-b',
    fontSize: 13,
    width: '50%',
  },
});

export default RequestListItem;
