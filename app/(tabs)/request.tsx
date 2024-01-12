import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import RequestListItem from '../../components/RequestListItem';

const Request = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <RequestListItem id="1" />
        <RequestListItem id="2" />
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
});

export default Request;
