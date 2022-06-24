import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect, useDispatch} from 'react-redux';
import * as actiontypes from '../Actions/Actiontypes'
import { AuthReducer } from '../Actions/Reducer';
import { ForgetPassword } from '../Actions/Action';
const Globalstyle = require('../Styles/GlobalStyles');
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Reset = ({navigation, ForgetPassword, AuthReducer}) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({type: actiontypes.Reset, isSignUpError: ''});
  // }, []);
  const [Username, setUsername] = useState('');
  const InputHandle = async () => {
    const EmailRegix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (Username != '') {
      if (EmailRegix.test(Username)) {
        // const data = await Action(Username) 
        ForgetPassword(Username);
      } else {
        alert('Email Not valid');
      }
    } else {
      alert('Email cannot be empty');
    }
  };

  return (
    <View style={Globalstyle.Container}>
      {AuthReducer.isLoading ? (
        <View style={Globalstyle.ActivityIndicator}>
          <ActivityIndicator size={20} color={'black'} />
          <Text style={{textAlign: 'center'}}>Please Wait</Text>
        </View>
      ) : null}
      <View style={Globalstyle.Back}>
        <Icon
          name="arrowleft"
          onPress={() => {
            navigation.navigate('Login');
          }}
          size={27}
          color={'black'}
        />
        <Text style={Globalstyle.BackText}>Back</Text>
      </View>
      <View style={styles.ResetImageView}>
        <Image
          style={styles.ResetImage}
          source={require('/Users/Bilal/NewProject/Assets/ResetLogo.png')}/>
        <Text style={styles.ResetPassword}>Reset Password ?</Text>
      </View>
      <View style={styles.RelatedInfo}>
        <Text style={styles.RelatedinfoText}>
          Enter one of the details below
        </Text>
        <Text style={styles.RelatedinfoText}>
          associated with your account and
        </Text>
        <Text style={styles.RelatedinfoText}>
          {' '}
          we'll email you a reset link.
        </Text>
      </View>
      <View style={[styles.InputFields, {marginTop: 20}]}>
        <View style={Globalstyle.sameInputTextView}>
          <View style={{padding: 15}}>
            <Image
            source={require('/Users/Bilal/NewProject/Assets/Email.png')}  
          />
          </View>
          <TextInput
            style={{color: 'black', width: '100%'}}
            placeholder="Username , Email or phone"
            placeholderTextColor={'black'}
            value={Username}
            onChangeText={value => setUsername(value)}
          />
        </View>
        {AuthReducer.isForgetPasswordError ? (
          <Text style={{color: 'red', marginBottom: 10}}>
            {AuthReducer.isForgetPasswordError}
          </Text>
        ) : null}
        <TouchableOpacity onPress={InputHandle} style={styles.submitt}>
          <Text style={styles.submittText}>Submitt</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BlankView}></View>
      <View style={Globalstyle.footer}>
        <Text style={Globalstyle.minifooter}>OR RETURN TO</Text>
        <Text
          style={Globalstyle.naivagetto}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </View>
      <View style={[Globalstyle.footer, {paddingTop: 15}]}>
        <Text style={Globalstyle.minifooter}>Dont have an Account? </Text>
        <Text
          style={Globalstyle.naivagetto}
          onPress={() => navigation.navigate('Signup')}>
          Signup
        </Text>
      </View>
    </View>
  );
};
const mapstatestoprops = state => {
  console.log('Rseet', state);
  return {
    AuthReducer: state,
  };
};

const dispatchstatestoprops = dispatch => {
  return {
    ForgetPassword: user => {
      dispatch(ForgetPassword(user));
    },
  };
};

export default connect(mapstatestoprops, dispatchstatestoprops)(Reset);

const styles = StyleSheet.create({
  ResetImageView: {
    height: Height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ResetImage: {
    width: Width * 0.62,
    height: Height * 0.23,
  },
  ResetPassword: {
    color: '#000000',
    fontSize: Height * 0.045,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 25,
  },
  RelatedInfo: {
    height: Height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  RelatedinfoText: {
    fontSize: Height * 0.026,
    fontWeight: '200',
    color: 'black',
  },
  InputFields: {
    height: Height * 0.26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  submittView: {
    height: Height * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitt: {
    backgroundColor: '#6153C3',
    height: Height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
  },
  submittText: {
    color: 'white',
    fontSize: Height * 0.03,
  },
  BlankView: {
    height: Height * 0.12,
  },
});
