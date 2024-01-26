import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

const TimeLineItem = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'mon-b',
          }}
        >
          <FontAwesome5 name="dot-circle" style={styles.iconTitleSuccess} />{' '}
          Pending for Review
        </Text>
        <Text style={styles.subTitle}>Jun 19, 2020</Text>
      </View>

      <View style={styles.timelineDetails}>
        <Text style={{ fontSize: 16, fontFamily: 'mon' }}>
          Your request is currently in review.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderLeftWidth: 1,
    borderLeftColor: Colors.secondaryLight,
    borderStyle: 'dashed',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconTitleSuccess: {
    fontSize: 24,
    backgroundColor: '#fff',
    color: Colors.successNeon,
  },
  iconTitleDanger: {
    fontSize: 24,
    backgroundColor: '#fff',
    color: Colors.dangerNeon,
  },
  headerTitle: {
    position: 'relative',
    top: -10,
    left: -10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subTitle: {
    color: Colors.secondaryLight,
    fontFamily: 'mon',
    fontSize: 12,
  },
  timelineDetails: {
    backgroundColor: '#f0f8ff',
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
  },
});

export default TimeLineItem;
