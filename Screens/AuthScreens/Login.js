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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {LoginAction} from '../Actions/Action';
import Globalstyle from '../Styles/GlobalStyles';
const Height = Dimensions.get('window').height;
import {connect} from 'react-redux';
import { HeightWindow } from '../DimesionsScreen/ScreenDimesnions';


const Login = ({navigation, LoginAction}) => {

  
  const [isloading, setloading] = useState(false);
  const [ErrorMessage, SeterrorMessage] = useState(null);
  const [showpass, setshowpass] = useState(false);
  const [visible, isvisible] = useState(true);
  const [UserField, SetUserField] = useState({Email: '', Password: ''});

  const InputHandler = (name, value) => {
    SetUserField({
      ...UserField,
      [name]: value,
    });
    if (name == 'Email') {
      SeterrorMessage('');
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
            setloading(true)
            const data = await LoginAction(UserField)
            console.log("data",data)
            if(data !== undefined){
              console.log("dAT",data)
              setloading(false)
              SeterrorMessage(data)
            }
            else {
              alert("Network Request Failed")
            }
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
    <View style={[Globalstyle.Container,{paddingHorizontal:10}]}>
      {isloading ? (
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
      <View style={[Globalstyle.Header,{marginTop:HeightWindow*0.08}]}>
        <Text style={Globalstyle.HeaderText}>Login</Text>
        <Text style={Globalstyle.HeaderInfo}>Enter Your Login info</Text>
      </View>

      <View style={styles.InputFields}>
        <View style={Globalstyle.sameInputTextView}>
          <View style={{padding: 10}}>
            <FontAwesome name='user' size={18} color={'black'}/>
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
          <View style={{padding: 10}}>
           <SimpleLineIcon name='lock' size={18} color={'black'}/>
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
            <Icon
              name={showpass == false ? 'eye-off' : 'eye'}
              size={20}
              color={'black'}
              onPress={() => {
                isvisible(!visible);
                setshowpass(!showpass);
              }}
            />
          </View>
        </View>
      </View>
      {ErrorMessage != null ? (
        <Text style={Globalstyle.RequestText}>{ErrorMessage}</Text>
      ):null}

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
          <FontAwesome name='facebook' size={20} color={'white'}/>
          <Text style={Globalstyle.socialText}>Login Via facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Globalstyle.socialapps, {backgroundColor: '#DE5246'}]}>
          <FontAwesome name='google' size={20} color={'white'}/>
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

export default connect(null, {LoginAction})(Login);

const styles = StyleSheet.create({
  InputFields: {
    height: Height * 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  BlankView: {
    height: Height * 0.05,
  },
});
