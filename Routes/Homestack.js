import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Payee from '../Screens/HomeScrens/Payee';
import Addpayee from '../Screens/HomeScrens/Addpayee';
const HomeStack = createNativeStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name='Payee' component={Payee} />
      <HomeStack.Screen name='Addpayee' component={Addpayee}/>
    </HomeStack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({

});
