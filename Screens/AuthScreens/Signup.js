import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
const Width = Dimensions.get('window').width;
import * as actiontypes from '../Actions/Actiontypes';
import { SignupAction } from '../Actions/Action'
import { AuthReducer } from '../Actions/Reducer';
const Height = Dimensions.get('window').height;
const Globalstyle = require('../Styles/GlobalStyles');
import {connect, useDispatch, useSelector} from 'react-redux';
const Signup = ({navigation, SignupAction, AuthReducer}) => {
  const dispatch = useDispatch();

  // useEffect(()=>{
  // dispatch({type:actiontypes.Reset})
  // },[])

  const [Value, SetValue] = useState({Name: '', Email: '', password: ''});
  const [isValid, setvalid] = useState(false);
  const [borderColor, setbordercolor] = useState('#E2E6EB');
  const [isuppercase, setuppercase] = useState(false);
  const [isnumber, setnumber] = useState(false);
  const [isspecial, setspecial] = useState(false);
  const uppercase = /(?=.*[A-Z])/;
  const Numberpattern = /.*[0-9].*/;
  const specilpattern = /(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-])/;

  const InputHandler = (name, value) => {
    SetValue({
      ...Value,
      [name]: value,
    });
    if (name == 'password' && value.length >= 8) {
      setvalid(true);
    } else if (name == 'password') {
      setvalid(false);
    }
    if (name == 'password' && uppercase.test(value)) {
      setuppercase(true);
    } else if (name == 'password') {
      setuppercase(false);
    }
    if (name == 'password' && specilpattern.test(value)) {
      setspecial(true);
    } else if (name == 'password') {
      setspecial(false);
    }
    if (name == 'password' && Numberpattern.test(value)) {
      setnumber(true);
    } else if (name == 'password') {
      setnumber(false);
    }
    if (name == 'Email' && AuthReducer.isSignUpError !== '') {
      setbordercolor('#E2E6EB');
      dispatch({type: actiontypes.Reset, isSignUpError: ''});
    }
  };

  const handleInput = async () => {
    const {Name, Email, password} = Value;
    const EmailRegix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (Name != '') {
      if (Email != '' && EmailRegix.test(Email)) {
        if (password != '') {
          if (password.length >= 8 && uppercase.test(password)) {
            const User = {Name, Email, password};
            console.log("user is",User)
            const data = await SignupAction(User);
          } else {
            alert('Password Reqirements not full fill');
          }
        } else {
          alert('password field cannot be empty');
        }
      } else {
        alert('Invalid Email');
      }
    } else {
      alert('Name cannot be empty');
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
            navigation.navigate('Landing');
          }}
          size={25}
          color={'black'}
        />
        <Text style={Globalstyle.BackText}>Back</Text>
      </View>
      <View style={Globalstyle.Header}>
        <Text style={Globalstyle.HeaderText}>Sign Up</Text>
        <Text style={Globalstyle.HeaderInfo}>create a new account</Text>
      </View>

      <View style={styles.InputFields}>
        <View style={Globalstyle.sameInputTextView}>
          <View style={styles.ImageView}>
            <Image source={require('/Users/Bilal/NewProject/Assets/User.png')}/>
          </View>
          <TextInput
            style={{color: 'black', width: '100%'}}
            placeholder="Full name"
            placeholderTextColor={'black'}
            value={Value.Name}
            onChangeText={value => InputHandler('Name', value)}
          />
        </View>
        <View style={[styles.UniqueInput, {borderColor: borderColor}]}>
          <View style={styles.ImageView}>
          <Image source={require('/Users/Bilal/NewProject/Assets/Email.png')}  /> 
          </View>
          <TextInput
            style={{color: 'black', width: '100%'}}
            placeholder="UserName or Email"
            placeholderTextColor={'black'}
            value={Value.Email}
            onChangeText={value => InputHandler('Email', value)}
          />
        </View>

        <View style={Globalstyle.sameInputTextView}>
          <View style={styles.ImageView}>
            <Image source={require('/Users/Bilal/NewProject/Assets/Lock.png')} />
          </View>
          <TextInput
            placeholder="*******"
            style={{color: 'black', width: '100%'}}
            secureTextEntry={true}
            placeholderTextColor={'black'}
            value={Value.password}
            onChangeText={value => InputHandler('password', value)}
          />
        </View>
      </View>
      {AuthReducer.isSignUpError !== '' ?
         <Text style={Globalstyle.RequestText}>{AuthReducer.isSignUpError}</Text> : null}

      <View style={styles.ValidationText}>
        <View style={styles.ValidateView}>
          <Text style={styles.PassValidate}>
            Password needs to be at least 8 characters long
          </Text>
          {isValid ? (
            <View style={[styles.checkIcon, {backgroundColor: 'green'}]}>
              <Icon name="check" size={6} color={'white'} />
            </View>
          ) : null}
        </View>
        <View style={styles.ValidateView}>
          <Text style={styles.PassValidate}>
            Password must contain at least 1 uppercase
          </Text>
          {isuppercase ? (
            <View style={[styles.checkIcon, {backgroundColor: 'green'}]}>
              <Icon name="check" size={6} color={'white'} />
            </View>
          ) : null}
        </View>
        <View style={styles.ValidateView}>
          <Text style={styles.PassValidate}>
            Password must contain at least 1 number
          </Text>
          {isnumber ? (
            <View style={[styles.checkIcon, {backgroundColor: 'green'}]}>
              <Icon name="check" size={6} color={'white'} />
            </View>
          ) : null}
        </View>
        <View style={styles.ValidateView}>
          <Text style={styles.PassValidate}>
            Password must contain at least 1 special character
          </Text>
          {isspecial ? (
            <View style={[styles.checkIcon, {backgroundColor: 'green'}]}>
              <Icon name="check" size={6} color={'white'} />
            </View>
          ) : null}
        </View>
      </View>
      <View style={Globalstyle.SubmitButtonView}>
        <TouchableOpacity
          onPress={handleInput}
          style={Globalstyle.SubmittButton}>
          <Text style={Globalstyle.SubmittButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Text style={Globalstyle.choice}>Or Login With</Text>
      <View style={Globalstyle.SocialLogin}>
        <TouchableOpacity style={Globalstyle.socialapps}>
          <Image source={require('/Users/Bilal/NewProject/Assets/Facebook.png')}   />
          <Text style={Globalstyle.socialText}>Login Via facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Globalstyle.socialapps, {backgroundColor: '#DE5246'}]}>
          <Image source={require('/Users/Bilal/NewProject/Assets/Google.png')} />
          <Text style={Globalstyle.socialText}>Login Via Google</Text>
        </TouchableOpacity>
      </View>
      <View style={Globalstyle.footer}>
        <Text style={Globalstyle.minifooter}>Do You Have an Account? </Text>
        <Text
          style={Globalstyle.naivagetto}
          onPress={() => navigation.navigate('Login')}>
          Signin
        </Text>
      </View>
    </View>
  );
};
const mapStatestoprop = state => {
  console.log("signup state",state)
  return {
    AuthReducer: state,
  };
};
const mapDispatchToprops = dispatch => {
  return {
    SignupAction: user => {
      dispatch(SignupAction(user));
    },
  };
};
export default connect(mapStatestoprop, mapDispatchToprops)(Signup);

const styles = StyleSheet.create({
  InputFields: {
    height: Height * 0.26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ValidationText: {
    justifyContent: 'center',
    height: Height * 0.12,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  checkIcon: {
    borderRadius: 50,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  PassValidate: {
    color: 'black',
    fontSize: Height * 0.016,
  },
  ValidateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  UniqueInput: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    width: '95%',
    borderWidth: 1,
    borderRadius: 10,
    height: Height * 0.08,
    marginBottom: 20,
  },

  ImageView: {
    height: Height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
