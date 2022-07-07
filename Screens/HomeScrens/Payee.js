import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import {Logout} from '../Actions/Action';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
const Height = Dimensions.get('screen').height;
const Payee = ({Logout, Payeeadded,AuthReducer,navigation}) => {
  const dispatch = useDispatch();
  const handleInput = async () => {
    console.log('logout');
    dispatch(Logout());
  };
  return (
    <View style={GlobalStyles.Container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.Payee}>Payees</Text>
      </View>
      <Pressable style={styles.addView} onPress={() => {
       navigation.navigate('AddPayee')
      }}>
        <View style={styles.OnpressableView}>
          <View style={{flexDirection: 'row', width: '88%'}}>
            <Icon name="pluscircleo" size={20} color={'#6153C3'} />
            <Text style={styles.addpayee}>Add New Payee</Text>
          </View>
          <Icon name="arrowright" size={20} color={'#6153C3'} />
          <View></View>
        </View>
      </Pressable>
      <View style={GlobalStyles.SubmitButtonView}>
        <TouchableOpacity
          onPress={handleInput}
          style={GlobalStyles.SubmittButton}>
          <Text style={GlobalStyles.SubmittButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapDispatchToprops = dispatch => {
  return {
    Logout: () => dispatch(Logout()),
  };
};
const mapStatestoprop = state => {
  return {
    AuthReducer: state,
  };
};

export default connect(mapStatestoprop, mapDispatchToprops)(Payee);

const styles = StyleSheet.create({
  addView: {
    height: Height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OnpressableView: {
    width: '90%',
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: 'grey',
    justifyContent: 'space-between',
  },
  addpayee: {
    color: 'black',
    paddingLeft: 15,
  },
 
});
