import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import User from '../types/userInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Education from '../types/educationInterface';

export type StoreTypes = {
  user: User | null;
  educations: Education[] | null;
  _token: string | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setEducation: (educations: Education[]) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
};

const authStore = (set: any, get: any): StoreTypes => ({
  user: null,
  educations: null,
  _token: '',
  setToken: (token: string) => set({ _token: token }),
  setUser: (user: User) => set({ user }),
  setEducation: (educations: Education[]) => set({ educations }),
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
