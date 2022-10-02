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
import {connect} from 'react-redux';
import { AuthReducer } from '../Actions/Reducer';
import { ForgetPassword } from '../Actions/Action';
import { HeightWindow, WidthWindow } from '../DimesionsScreen/ScreenDimesnions';
const Globalstyle = require('../Styles/GlobalStyles');


const Reset = ({navigation, ForgetPassword, AuthReducer}) => {

  const [Username, setUsername] = useState('');
  const[ErrorMessage, SeterrorMessage] = useState('')
  const[loading,setloading] = useState(false)
  const InputHandle = async () => {
    const EmailRegix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (Username != '') {
      if (EmailRegix.test(Username)) {
        setloading(true)
        const data = await ForgetPassword(Username);
        if(data){
          console.log("data",data)
          setloading(false)
          SeterrorMessage(data)
        }
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
          source={require('../../Assets/ResetLogo.png')}/>
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
            source={require('../../Assets/Email.png')}  
          />
          </View>
          <TextInput
            style={{color: 'black', width: '100%'}}
            placeholder="Email"
            placeholderTextColor={'black'}
            value={Username}
            onChangeText={value => setUsername(value)}
          />
        </View>
        {ErrorMessage !== '' ? (
          <Text style={{color: 'red', marginBottom: 10}}>
            {ErrorMessage}
          </Text>
        ) : null}
        <TouchableOpacity onPress={InputHandle} style={styles.submitt}>
          <Text style={styles.submittText}>Submitt</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BlankView}></View>
      <View style={[Globalstyle.footer,{marginBottom:20}]}>
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



export default connect(mapstatestoprops, {ForgetPassword})(Reset);

const styles = StyleSheet.create({
  ResetImageView: {
    padding:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ResetImage: {
    width: WidthWindow * 0.65,
    height: HeightWindow * 0.22,
  },
  ResetPassword: {
    marginTop:HeightWindow * 0.02,
    color: '#000000',
    fontSize: HeightWindow * 0.04,
    fontWeight: 'bold',
  },
  RelatedInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  RelatedinfoText: {
    fontSize: HeightWindow * 0.022,
    fontWeight: '200',
    color: 'black',
  },
  InputFields: {
    height: HeightWindow * 0.22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  submittView: {
    height: HeightWindow * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitt: {
    backgroundColor: '#6153C3',
    paddingVertical:15,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
  },
  submittText: {
    color: 'white',
    fontSize: HeightWindow * 0.023,
  },
  BlankView: {
    height: HeightWindow * 0.05,
  },
});
