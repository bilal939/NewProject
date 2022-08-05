import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Homestack from './Homestack';
import {connect} from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthReducer } from '../Screens/Actions/Reducer';
import * as actionTypes from '../Screens/Actions/Actiontypes'
import { NavigationContainer } from '@react-navigation/native';
import Authstack from './Authstack';
const Index = ({AuthReducer}) => {

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
      {AuthReducer.isloggedin  ? (
        <Homestack/> 

      )     
       :(
        <Authstack/>        

       )
      }
      </NavigationContainer>
  );
};

const mapstatestoprops = state =>{
  console.log(state)
  return {
   AuthReducer:state
  }
}

export default connect(mapstatestoprops,null)(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
