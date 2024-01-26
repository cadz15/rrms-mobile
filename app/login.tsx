import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = () => {
  const [password, setPassword] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleShowPassword = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <SafeAreaView>
      <View style={{ position: 'relative', flexDirection: 'column' }}>
        <LinearGradient
          colors={['#5454ed', '#00d4ff']}
          style={styles.gradientBackground}
        ></LinearGradient>
        <View></View>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>RRMS - BIST</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Welcome to RRMS</Text>
            <Text style={styles.headerSubtitle}>
              Please enter your credentials to continue
            </Text>
          </View>
          <View>
            <Text style={styles.inputLabel}>ID Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
                style={styles.inputWithIcon}
                placeholder="ID Number"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={!isSecureTextEntry}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                style={styles.inputWithIcon}
                placeholder="Password"
                placeholderTextColor="#aaa"
              />
              <MaterialCommunityIcons
                name={isSecureTextEntry ? 'eye-off' : 'eye'}
                size={24}
                color="#aaa"
                onPress={toggleShowPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'mon-b',
                fontSize: 18,
                color: '#fff',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontFamily: 'mon-sb',
              fontSize: 16,
              color: Colors.secondaryLight,
            }}
          >
            No account?{'  '}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'mon-b',
                fontSize: 16,
                color: Colors.primary,
              }}
            >
              Create here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    padding: 20,
    width: '100%',
    marginTop: '30%',
  },
  gradientBackground: { height: 450, borderRadius: 15 },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  logoText: { fontFamily: 'mon-b', fontSize: 20, color: 'white' },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 30,
    borderRadius: 10,
    padding: 20,
    rowGap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'mon-b',
    fontSize: 17,
    color: Colors.secondary,
  },
  headerSubtitle: {
    fontFamily: 'mon',
    fontSize: 14,
    color: Colors.secondaryLight,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  inputWithIcon: {
    flex: 1,
    color: '#333',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});

export default Login;
