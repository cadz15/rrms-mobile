import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/studentStore';
import axios from 'axios';
import apiRoutes from '../util/APIRoutes';
import Colors from '../constants/Colors';

const HeroCard = () => {
  const { user, setEducation, _token } = useStore();

  const [isLoading, setIsLoading] = useState(false);

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
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(50,112,214, 0.8)', 'rgba(0, 97, 255, 0.8)']}
        style={styles.card}
      >
        <Text style={styles.cardText}>
          Greetings{' '}
          <Text style={[styles.cardText, { fontFamily: 'mon-sb' }]}>
            {user ? (user.sex === 'male' ? 'Mr. ' : 'Ms. ') : ''}
            {user ? user.last_name : 'Student'}
          </Text>
        </Text>
        <Text style={styles.cardText}>
          Welcome to online Registrar Record Management System.
        </Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </LinearGradient>
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
    shadowColor: '#002666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardText: {
    color: '#fff',
    fontFamily: 'mon',
    fontSize: 20,
  },
  logo: {
    position: 'absolute',
    width: 140,
    height: 140,
    right: -30,
    top: 0,
    shadowColor: '#002666',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: -1,
  },
});

export default HeroCard;
