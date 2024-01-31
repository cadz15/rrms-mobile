import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import User from '../types/userInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Education from '../types/educationInterface';
import RequestInterface from '../types/requestInterface';

interface RequestableItemInterface {
  id: number;
  name: string;
  group?: string;
}

export type StoreTypes = {
  user: User | null;
  educations: Education[] | null;
  requestableItems: RequestableItemInterface[] | null;
  _token: string | null;
  _tokenExpire: number;
  requests: RequestInterface | null;
  isRefreshingToken: boolean;
  setRequestableItems: (items: RequestableItemInterface[]) => void;
  setToken: (token: string) => void;
  setTokenExpire: (tokenExpire: number) => void;
  setUser: (user: User) => void;
  setEducation: (educations: Education[]) => void;
  setRequests: (requests: RequestInterface) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  setIsRefreshingToken: (value: boolean) => void;
};

const authStore = (set: any, get: any): StoreTypes => ({
  user: null,
  educations: null,
  requestableItems: null,
  _token: '',
  _tokenExpire: 0,
  requests: null,
  isRefreshingToken: false,
  setRequestableItems: (items: RequestableItemInterface[]) =>
    set({ requestableItems: items }),
  setToken: (token: string) => set({ _token: token }),
  setTokenExpire: (tokenExpire: number) => set({ _tokenExpire: tokenExpire }),
  setUser: (user: User) => set({ user }),
  setEducation: (educations: Education[]) => set({ educations }),
  setRequests: (requests: RequestInterface) => set({ requests }),
  selectedGender: 'male',
  setSelectedGender: (value: string) => set({ selectedGender: value }),
  setIsRefreshingToken: (value: boolean) => set({ isRefreshingToken: value }),
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
