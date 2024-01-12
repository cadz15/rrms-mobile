import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Information = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.profile]}>
        <Image
          source={require('../../assets/images/profile-male.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Juan Dela Cruz Jr.</Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link
            href={'/(modals)/basic-information'}
            style={[styles.links, { flex: 1 }]}
          >
            <Text>Basic Information</Text>
          </Link>

          <Link href={'/(modals)/basic-information'} style={styles.links}>
            <Ionicons name="chevron-forward-sharp" size={20} />
          </Link>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link
            href={'/(modals)/educations'}
            style={[styles.links, { flex: 1 }]}
          >
            <Text>Educations</Text>
          </Link>

          <Link href={'/(modals)/educations'} style={styles.links}>
            <Ionicons name="chevron-forward-sharp" size={20} />
          </Link>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { justifyContent: 'space-between', flexDirection: 'row' },
        ]}
      >
        <Link
          href={'/(modals)/change-password'}
          style={[styles.links, { flex: 1 }]}
        >
          <Text style={styles.linkText}>Change Password</Text>
        </Link>
        <Link href={'/(modals)/change-password'} style={styles.links}>
          <Ionicons name="chevron-forward-sharp" size={20} />
        </Link>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.links}>
          <Text
            style={{ color: Colors.danger, fontFamily: 'mon-sb', fontSize: 20 }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    fontFamily: 'mon',
  },
  profile: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#02263C',
    borderWidth: 2,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'mon-sb',
    color: '#fff',
  },
  links: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 0.9,
    padding: 10,
    paddingVertical: 15,
    fontSize: 20,
    fontFamily: 'mon-sb',
  },
  linkText: {},
});

export default Information;
