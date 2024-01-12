import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const HeroCard = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(50,112,214, 0.8)', 'rgba(0, 97, 255, 0.8)']}
        style={styles.card}
      >
        <Text style={styles.cardText}>
          Greetings{' '}
          <Text style={[styles.cardText, { fontFamily: 'mon-sb' }]}>
            Mr. Dela Cruz,
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
