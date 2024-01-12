import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TamaguiProvider config={config}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/basic-information"
            options={{
              presentation: 'modal',
              title: 'Basic Information',
              headerTitleStyle: { fontFamily: 'mon-sb' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="(modals)/educations"
            options={{
              presentation: 'modal',
              title: 'Educations',
              headerTitleStyle: { fontFamily: 'mon-sb' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="(modals)/add-education"
            options={{
              presentation: 'modal',
              title: 'Add New Education',
              headerTitleStyle: { fontFamily: 'mon-sb' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="(modals)/change-password"
            options={{
              presentation: 'modal',
              title: 'Change Password',
              headerTitleStyle: { fontFamily: 'mon-sb' },
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="request/[id]"
            options={{
              presentation: 'modal',
              title: 'Request',
              headerTitleStyle: { fontFamily: 'mon-sb' },
              animation: 'slide_from_right',
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </TamaguiProvider>
  );
}
