import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Payee from '../Screens/HomeScrens/Payee';
import Addpayee from '../Screens/HomeScrens/Addpayee';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const Homestack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Payee'>
      <Stack.Screen name="Payee" component={Payee} />
      <Stack.Screen name="AddPayee" component={Addpayee} />
    </Stack.Navigator>
  );
};

export default Homestack;

const styles = StyleSheet.create({});
