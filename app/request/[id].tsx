import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const RequestItem = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>RequestItem {id}</Text>
    </View>
  );
};

export default RequestItem;
