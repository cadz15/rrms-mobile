import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import User from '../types/userInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoreTypes = {
  user: User;
  setUser: (user: User) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
};

const persistentMiddleware = (f: any) =>
  devtools(
    persist(f, {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    }),
  );

export const useStore = create()(
  persistentMiddleware(
    (set: any, get: any): StoreTypes => ({
      user: {} as User,
      setUser: (user: User) => set(() => ({ user })),
      selectedGender: 'male',
      setSelectedGender: (value: string) =>
        set(() => ({ selectedGender: value })),
    }),
  ),
);
