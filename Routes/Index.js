import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Homestack from './Homestack';
import {connect} from 'react-redux';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../Screens/Actions/Actiontypes'
import { NavigationContainer } from '@react-navigation/native';
import Authstack from './Authstack';
import { AuthReducer } from '../Screens/Actions/Reducer';
const Index = ({AuthReducer,navigation}) => {

  let userToken='';
  const dispatch = useDispatch();

  useEffect(() => {
    const GetToken = async () => {
      try {
        userToken = await AsyncStorage.getItem('token');
        console.log('user token', userToken);
        if (userToken == null || userToken == 'Expired Token') {
          navigation.navigate('Login')
          dispatch({type:actionTypes.islogout})

        } else {
          console.log("token milgya")
          dispatch({type:actionTypes.Login})
        }
  
      } catch (e) {
        console.log('errorczxczxc', e);
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

const mapstatestoprops = state =>({
   AuthReducer:state
  
})

export default connect(mapstatestoprops)(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});