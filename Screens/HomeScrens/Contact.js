import {StyleSheet, Text, View, TouchableOpacity,FlatList} from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {Logout} from '../Actions/Action';
import Contacts from 'react-native-contacts';
import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
const Contact = ({Logout}) => {

  const[Contact,setContact]=useState([]);

  // useEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //     buttonPositive: 'Please accept bare mortal',
  //   }).then(
  //     Contacts.getAll()
  //       .then(contacts => {
  //         // work with contacts
  //         console.log(contacts.map(item=>{
  //           setContact(item)
  //         }));
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       }),
  //   );
  // }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts App Permissions",
          message:
            "Allow Brytt To have Access to Your Contacts",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll() 
              .then(contacts => {
                // work with contacts
                console.log("items",contacts[0].phoneNumbers[0].number)
              })
            
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  const dispatch = useDispatch();

  const handleInput = async () => {
    console.log('logout');
    dispatch(Logout());
  };

  return (
    <View style={GlobalStyles.Container}>
      <View style={GlobalStyles.SubmitButtonView}>
        <TouchableOpacity
          onPress={requestCameraPermission}
          style={GlobalStyles.SubmittButton}>
          <Text style={GlobalStyles.SubmittButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect(null, {Logout})(Contact);

const styles = StyleSheet.create({});
