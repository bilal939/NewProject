import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../Screens/LandingScreen/Landing';
import Login from '../Screens/AuthScreens/Login';
import Signup from '../Screens/AuthScreens/Signup';
import Reset from '../Screens/AuthScreens/Reset';
import Payee from '../Screens/HomeScrens/Payee';
import * as actionTypes from '../Screens/Actions/Actiontypes';
import {useEffect, useState} from 'react';
import Addpayee from '../Screens/HomeScrens/Addpayee';
import {AuthReducer} from '../Screens/Actions/Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useDispatch} from 'react-redux';
const Stack = createNativeStackNavigator();

const Homestack = ({AuthReducer}) => {
  
  
  let userToken='';
  const dispatch = useDispatch();

  useEffect(() => {
    const GetToken = async () => {
      try {
        userToken = await AsyncStorage.getItem('token');
        console.log('user token', userToken);
        if (userToken == null) {
          dispatch({type:actionTypes.islogout})
        } else {
          console.log("token milgya")
          dispatch({type:actionTypes.Login})
        }
  
      } catch (e) {
        console.log('error', e);
      }
    };
    GetToken();
  },[]);


  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Landing"
        screenOptions={{headerShown: false}}>
        {AuthReducer.isloggedin  ? (
          <>
          <Stack.Screen   name="Payee" component={Payee} />
          <Stack.Screen   name="AddPayee" component={Addpayee} /> 
          </>         
        ) : (
          <>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Reset" component={Reset} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapstatestoprops = state =>{
  // console.log("Home stack state",state)
  return {
   AuthReducer:state
  }
}

export default connect(mapstatestoprops,null)(Homestack);

const styles = StyleSheet.create({});
