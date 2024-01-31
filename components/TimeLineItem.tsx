import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const TimeLineItem = (props: any) => {
  const showLink = () => {
    Linking.openURL(props?.link);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        {props?.completed ? (
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'mon-b',
              color:
                props?.title === 'Declined'
                  ? Colors.danger
                  : Colors.secondaryLight,
            }}
          >
            <Ionicons
              name={
                props?.title === 'Declined'
                  ? 'alert-circle-outline'
                  : 'checkmark-circle-sharp'
              }
              style={[
                styles.iconTitleSuccess,
                {
                  color:
                    props?.title === 'Declined'
                      ? Colors.danger
                      : Colors.primary,
                },
              ]}
            />{' '}
            {props?.title}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'mon-b',
            }}
          >
            <FontAwesome5 name="dot-circle" style={styles.iconTitleSuccess} />{' '}
            {props?.title}
          </Text>
        )}
        <Text style={styles.subTitle}>{props?.date}</Text>
      </View>

      <View style={styles.timelineDetails}>
        <Text style={{ fontSize: 16, fontFamily: 'mon' }}>{props?.detail}</Text>
        {props?.link && (
          <Text
            onPress={showLink}
            style={{
              fontFamily: 'mon-sb',
              fontSize: 16,
              color: Colors.primary,
            }}
          >
            {props?.link}
          </Text>
        )}
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
