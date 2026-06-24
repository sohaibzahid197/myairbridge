import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import RoleScreen from '../screens/RoleScreen';
import SignupScreen from '../screens/SignupScreen';
import Tabs from './Tabs';
import TruckDetailScreen from '../screens/TruckDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Role" component={RoleScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="TruckDetail" component={TruckDetailScreen} />
    </Stack.Navigator>
  );
}
