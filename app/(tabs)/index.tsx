import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import HeroCard from '../../components/HeroCard';
import { StyleSheet } from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeroCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    rowGap: 10,
  },
});

export default Index;
