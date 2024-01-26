import React, { useEffect, useRef } from 'react';
import { Tabs, router } from 'expo-router';
import Colors from '../../constants/Colors';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontFamily: 'mon-b',
  },
  profileHeader: {
    backgroundColor: Colors.secondary,
    shadowOpacity: 0,
    elevation: 0,
  },
});

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          headerTitle: 'Home',
          headerTitleStyle: styles.header,
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          tabBarLabel: 'Request',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="text-box-plus-outline"
              color={color}
              size={size}
            />
          ),
          headerTitle: 'Request Document',
          headerTitleStyle: styles.header,
          headerStyle: { backgroundColor: '#fff' },
          headerRight: () => (
            <>
              <Link
                href={`/request/createRequest`}
                style={{
                  position: 'relative',
                  top: 5,
                  paddingRight: 10,
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={38}
                  style={{
                    color: Colors.primary,
                  }}
                />
              </Link>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="information"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" color={color} size={size} />
          ),
          headerTitle: 'Profile',
          headerTitleStyle: [styles.header, { color: '#fff' }],
          headerStyle: styles.profileHeader,
        }}
      />
    </Tabs>
  );
};

export default Layout;
