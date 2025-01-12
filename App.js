import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loadingscreen from './screens/loadingscreen.js';
import login from './screens/login.js';
import Signin from './screens/Signin.js';
import Signup from './screens/Signup.js';
import Allstart from './screens/Allstart.js';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen name='Loading' component={loadingscreen}></Stack.Screen>

        <Stack.Screen name='Home' component={login}></Stack.Screen>
        <Stack.Screen name='Signin' component={Signin}></Stack.Screen>
        <Stack.Screen name="Register" component={Signup}></Stack.Screen>
        <Stack.Screen name="Welcome" component={Allstart}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


