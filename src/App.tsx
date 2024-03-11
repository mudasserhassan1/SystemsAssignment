import React from 'react';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feedback from './screens/Feedback';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={{headerShown: false, animation: 'slide_from_right'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
