import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import test from './Screens/test';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Action = async (Fullname, Email, Password) => {
//   console.log('Fullname is',Fullname);
//   console.log("Email is",Email)
//   console.log("passwod is ",Password)
//   try {
//     await fetch('https://brytapps.codexnow.com/loginAndRegister/user/signup', {
//       method: 'POST',
//       headers: {
//         Accept: '*/*',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: Email,
//         password: Password,
//         full_name: Fullname,
//       }),
//     })
//       .then(async res => {
//         const Response = await res.json();
//         if (res.status == 201 ) {
//          alert("User Created")
//          console.log("response is ",Response.data)
//         } else {

//          console.log("response is ",Response)
//           return Response
//           // const error =  await AsyncStorage.setItem('errpr',Response.description)
//           // console.log("User Already Exists")
//         }

//       })
//   } catch (error) {
//     console.log(error);
//   }
// };



