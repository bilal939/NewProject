import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import React from 'react';
import {connect, useDispatch} from 'react-redux';
import { Logout } from '../Actions/Action';
const Contact = ({Logout}) => {
  const dispatch = useDispatch();

  const handleInput = async () => {
    console.log('logout');
    dispatch(Logout());
  };

  return (
    <View style={GlobalStyles.Container}>
      <View style={GlobalStyles.SubmitButtonView}>
        <TouchableOpacity
          onPress={handleInput}
          style={GlobalStyles.SubmittButton}>
          <Text style={GlobalStyles.SubmittButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default connect(null,{Logout})(Contact)

const styles = StyleSheet.create({})