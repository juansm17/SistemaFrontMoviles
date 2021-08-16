import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './src/screen/SiginUp'
import SignIn from './src/screen/SiginIn';
import Solicitud from './src/screen/Solicitud';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>  
      
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: "Sign In", headerShown: false }}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up", headerShown: false }}></Stack.Screen>
        <Stack.Screen name=" Solicitud" component={Solicitud} options={{ title: "Solicitud", headerShown: false }}></Stack.Screen>   
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});