import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as actiontypes from '../Actions/Actiontypes';
import {LoginAction} from '../Actions/Action';
import {AuthReducer} from '../Actions/Reducer';
import Globalstyle from '../Styles/GlobalStyles';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import {connect, useDispatch} from 'react-redux';

const Login = ({navigation, AuthReducer,LoginAction}) => {
  const dispatch = useDispatch();
  const[isloading,setloading]=useState(false)
  const[ErrorMessage,SeterrorMessage]=useState('')
  const[showpass,setshowpass]=useState(false)
  const[visible , isvisible] = useState(true)
  const [UserField, SetUserField] = useState({Email: '', Password: ''});
  const InputHandler = (name, value) => {
    SetUserField({
      ...UserField,
      [name]: value,
    });
    if (name == 'Email' && AuthReducer.isLoginError !== '') {
      dispatch({type: actiontypes.Reset, isLoginError: ''});
    }
  };
  const HandleInput = async () => {
    const EmailRegix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const PasswordRegix =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const {Email, Password} = UserField;
    if (Email != '') {
      if (EmailRegix.test(Email)) {
        if (Password != '') {
          if (PasswordRegix.test(Password)) {
            const Userdata = {Email, Password};
            console.log('user email', Userdata.Email);
            console.log('user password is', Userdata.Password);
            const data = await LoginAction(UserField)
            // console.log("data",data)
            // (async () => {
            //   console.log(await LoginAction(UserField))
            // })().then(async x=>{
            //   SeterrorMessage(x)
            //   setloading(true)
            //   console.log("x is",x)
            // })
           
           
          } else {
            alert('In Valid password');
          }
        } else {
          alert('Password Field cannot be empty');
        }
      } else {
        alert('Not A valid Email');
      }
    } else {
      alert('Email Field cannot be empty');
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
          name="arrow-left"
          onPress={() => {
            navigation.navigate('Landing');
          }}
          size={27}
          color={'black'}
        />
        <Text style={Globalstyle.BackText}>Back</Text>
      </View>
      <View style={Globalstyle.Header}>
        <Text style={Globalstyle.HeaderText}>Login</Text>
        <Text style={Globalstyle.HeaderInfo}>Enter Your Login info</Text>
      </View>

      <View style={styles.InputFields}>
        <View style={Globalstyle.sameInputTextView}>
          <View style={{padding: 15}}>
            <Image
              source={require('/Users/Bilal/NewProject/Assets/Email.png')}
            />
          </View>
          <TextInput
            style={{color: 'black', width: '100%'}}
            placeholder="Username Email Or Phone"
            placeholderTextColor={'black'}
            value={UserField.Email}
            onChangeText={value => InputHandler('Email', value)}
          />
        </View>
        <View style={Globalstyle.sameInputTextView}>
          <View style={{padding: 15}}>
            <Image
              source={require('/Users/Bilal/NewProject/Assets/Lock.png')}
            />
          </View>
          <TextInput
            style={{color: 'black', width: '75%'}}
            placeholder="********"
            secureTextEntry={visible}
            placeholderTextColor={'black'}
            value={UserField.Password}
            onChangeText={value => InputHandler('Password', value)}
          />

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name={showpass == false ? 'eye-off' :'eye'} size={20} color={'black'} onPress={()=>{
              isvisible(!visible)
              setshowpass(!showpass)
            }} />
          </View>
        </View>
      </View>
      {isloading ? (
        <Text style={Globalstyle.RequestText}>{ErrorMessage}</Text>
      ) : null}

      <View style={Globalstyle.SubmitButtonView}>
        <TouchableOpacity
          onPress={HandleInput}
          style={Globalstyle.SubmittButton}>
          <Text style={Globalstyle.SubmittButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.BlankView}></View>
      <Text style={Globalstyle.choice}>Or Login With</Text>
      <View style={Globalstyle.SocialLogin}>
        <TouchableOpacity style={Globalstyle.socialapps}>
          <Image
            source={require('/Users/Bilal/NewProject/Assets/Facebook.png')}
          />
          <Text style={Globalstyle.socialText}>Login Via facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Globalstyle.socialapps, {backgroundColor: '#DE5246'}]}>
          <Image
            source={require('/Users/Bilal/NewProject/Assets/Google.png')}
          />
          <Text style={Globalstyle.socialText}>Login Via Google</Text>
        </TouchableOpacity>
      </View>
      <View style={Globalstyle.footer}>
        <Text style={Globalstyle.minifooter}>Forget Password? </Text>
        <Text
          style={Globalstyle.naivagetto}
          onPress={() => navigation.navigate('Reset')}>
          Reset
        </Text>
      </View>
    </View>
  );
};
const mapStatestoprop = state => {
  console.log('login state', state);
  return {
    AuthReducer: state,
  };
};
const mapDispatchToprops = dispatch => {
  return {
    LoginAction: user => {dispatch(LoginAction(user));},
  };
};

export default connect(mapStatestoprop, mapDispatchToprops)(Login);

const styles = StyleSheet.create({
  InputFields: {
    height: Height * 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  BlankView: {
    height: Height * 0.14,
  },
});
