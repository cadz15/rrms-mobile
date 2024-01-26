import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import User from '../types/userInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoreTypes = {
  user: User | null;
  _token: string | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
};

const authStore = (set: any, get: any): StoreTypes => ({
  user: null,
  _token: null,
  setToken: (token: string) => set({ _token: token }),
  setUser: (user: User) => set({ user }),
  selectedGender: 'male',
  setSelectedGender: (value: string) => set({ selectedGender: value }),
});

const persistentMiddleware = (f: any) =>
  devtools(
    persist(f, {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    }),
  );

const useStore = create(persistentMiddleware(authStore));

export default useStore;
