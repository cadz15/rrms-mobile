import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';

type PropTypes = {
  id: string;
};

const RequestListItem = (props: PropTypes) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Link
          href={`request/${props.id}` as `http${string}`}
          style={{ flexDirection: 'row' }}
        >
          <View>
            <Text style={styles.cardTitle}>Request List Item Name</Text>
            <Text
              style={{
                fontFamily: 'mon',
                fontSize: 12,
                color: Colors.secondaryLight,
              }}
            >
              January 20, 2023 10:30AM
            </Text>
            <Text style={styles.cardBadge}>Pending for Review</Text>
          </View>
        </Link>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.cardAmount}>P 3,500.00</Text>
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
    color: Colors.danger,
    width: '50%',
  },
});

export default RequestListItem;
