/**
 * @format
 */

import React from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { name as appName } from './app.json';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import App from './App';
import EditClass from './EditClass';
import CustomTheme from './customTheme';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <PaperProvider theme={CustomTheme} children={undefined}>
        <NavigationContainer children={undefined}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Home"
                component={App}
                />
              <Stack.Screen
                name="EditClass"
                component={EditClass}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
