import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import AccordionGroup from '../../components/AccordionGroup';

const Educations = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <AccordionGroup style={styles.card} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    rowGap: 10,
  },
});

export default Educations;
