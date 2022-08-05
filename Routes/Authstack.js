import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/AuthScreens/Login';
import Signup from '../Screens/AuthScreens/Signup';
import Reset from '../Screens/AuthScreens/Reset';

const AuthStack = createNativeStackNavigator();

const Authstack = () => {
  return (
   <AuthStack.Navigator screenOptions={{
    headerShown:false
   }}>
    
    <AuthStack.Screen name='Login' component={Login} />
    {/* <Authstack.Screen name='Signup' component={Signup} /> */}
    <AuthStack.Screen name='Reset' component={Reset} />
   </AuthStack.Navigator>
  )
}

export default Authstack;

const styles = StyleSheet.create({})