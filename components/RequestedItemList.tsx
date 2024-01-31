import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

interface PropsType {
  children: any;
  total: string | undefined;
}

const RequestedItemList = (props: PropsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Item Requested</Text>

      {props.children}

      <View style={styles.totalContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.totalText}>TOTAL</Text>
        </View>

        <View style={{ width: 100 }}>
          <Text style={styles.totalAmount}>{props?.total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontFamily: 'mon-sb',
    color: Colors.secondaryLight,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  totalContainer: {
    paddingBottom: 20,
    flexDirection: 'row',
    padding: 20,
  },
  totalText: {
    fontFamily: 'mon-b',
    fontSize: 20,
    textAlign: 'right',
  },
  totalAmount: {
    textAlign: 'right',
    color: Colors.primary,
    fontFamily: 'mon-b',
    fontSize: 20,
  },
});

export default RequestedItemList;
