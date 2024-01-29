import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AccordionGroup from '../../components/AccordionGroup';
import useStore from '../../store/studentStore';
import apiRoutes from '../../util/APIRoutes';
import axios from 'axios';
import Colors from '../../constants/Colors';

const Educations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { educations, setEducation, _token } = useStore();

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);

      axios
        .post(
          apiRoutes.profile,
          {},
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${_token}`,
            },
          },
        )
        .then((response) => {
          if (response.status === 200) {
            setEducation(response.data.educations);

            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
