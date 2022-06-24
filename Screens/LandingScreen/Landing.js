import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    ImageBackground
  } from 'react-native';
  import React from 'react';
  import {Dimensions} from 'react-native';
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const Landing = ({navigation}) => {
    return (
      <View style={styles.Container}>
        <ImageBackground
        resizeMode='cover'
        styles={{paddingHorizontal:20}}
        style={styles.image1style}
        source={require('/Users/Bilal/NewProject/Assets/BackgroundImage.png')}
        >
        <View style={styles.image1style}>
        <Image
          style={styles.MainImage}
          source={require('/Users/Bilal/NewProject/Assets/MainImage.png')}
        />
      </View>
      </ImageBackground>
      
        <View style={styles.GetStartedView}>
          <Text style={styles.GetStarted}>Let's Get Started</Text>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.sametextView}>The Most Efficient Way To </Text>
          <Text
            style={styles.sametextView}>
            Tranfer And Save Money
          </Text>
        </View>
        <View style={styles.LogoWithText}>
          <Image
            style={styles.brightLogo}
            source={require('/Users/Bilal/NewProject/Assets/BryttLogo.png')}
          />
        </View>
        <View style={styles.CreateAcoountView}>
          <TouchableOpacity
            style={styles.CreateAccount}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.CreateLoginText}>Create Account</Text>
            
          </TouchableOpacity>
        </View>
        <View style={styles.LoginView}>
          <TouchableOpacity
            style={styles.LoginButton}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.Login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Landing;
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: 'white',
    },
    image1style: {
      height: Height * 0.37,
      justifyContent: 'center',
      alignItems: 'center',
      margin:20,
    },
    MainImage: {
      width: Width * 0.61,
      height: Height * 0.32,
    },
    TextView: {
      padding:10,
      // backgroundColor:'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    LogoWithText: {
      height: Height * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    CreateAcoountView: {
      height: Height * 0.1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    brightLogo: {
      height: Height * 0.061,
      width: Width * 0.7,
    },
    GetStartedView: {
      height: Height * 0.08,
      justifyContent: 'center',
      alignItems: 'center',
    },
    GetStarted: {
      color: '#000000',
      fontSize: Height * 0.05,
      fontWeight: 'bold',
      // width:Width/0.2,
      textAlign:'center'
    },
    sametextView: {
      fontSize: Height * 0.03,
      fontWeight: '200',
      color: 'black',
    },
    LoginView: {
      height: Height * 0.09,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CreateAccount: {
      backgroundColor: '#4F44FF',
      height: Height * 0.064,
      justifyContent: 'center',
      alignItems: 'center',
      width: Width * 0.8,
      borderRadius: 25,
    },
    CreateLoginText: {
      color: 'white',
      fontSize: Height * 0.021,
    },
    LoginButton: {
      backgroundColor: 'white',
      height: Height * 0.064,
      justifyContent: 'center',
      alignItems: 'center',
      width: Width * 0.8,
      borderRadius: 25,
      borderColor: '#4F44FF',
      borderWidth: 1,
    },
    Login: {
      color: '#4F44FF',
      fontSize: Height * 0.022,
    },
  });
  