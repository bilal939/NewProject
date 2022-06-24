import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyles from '../Styles/GlobalStyles';
import { Logout } from '../Actions/Action';
import { connect, useDispatch } from 'react-redux';
const Payee = ({navigation,}) => {
  const dispatch = useDispatch();
  const handleInput = async () => {
    console.log("logout")
    dispatch(Logout())
  }
  return (
    <View style={GlobalStyles.Container}>
      <Text style={{color:'black' , marginTop:30,paddingHorizontal:20}} >Payee</Text>
      
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

const mapDispatchToprops = dispatch =>{
  return {
   Logout :()=>dispatch(Logout())
  }
}

export default connect(null,mapDispatchToprops)(Payee);

const styles = StyleSheet.create({})