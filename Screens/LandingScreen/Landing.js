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
  import { WidthWindow } from '../DimesionsScreen/ScreenDimesnions';
  import { HeightWindow } from '../DimesionsScreen/ScreenDimesnions';
  const Landing = ({navigation}) => {
    return (
      <View style={styles.Container}>
        <View style={{padding:10,marginTop:20}}>
        <ImageBackground
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
        </View>
       
      
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
      paddingHorizontal:50,
      paddingTop:20,
    },
    image1style: {
      justifyContent: 'center',
      alignItems: 'center',
      margin:10,
      marginBottom:20
    },
    MainImage: {
      width: WidthWindow * 0.5,
      height: HeightWindow * 0.23,
    },
    TextView: {
      padding:10,
      // paddingLeft:50,
      alignItems:'center',
      justifyContent: 'center',
    },
    LogoWithText: {
      marginTop:20,
      marginBottom:HeightWindow*0.05,
      justifyContent: 'center',
      alignItems: 'center',
    },
    CreateAcoountView: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    brightLogo: {
      height: HeightWindow * 0.04,
      width: WidthWindow * 0.51,
      
    },
    GetStartedView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    GetStarted: {
      color: '#000000',
      fontSize: HeightWindow * 0.028,
      fontWeight: 'bold',
      textAlign:'center'
    },
    sametextView: {
      marginTop:8,
      fontSize: HeightWindow * 0.017,
      fontWeight: '300',
      color: 'black',
    },
    LoginView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    CreateAccount: {
      marginTop:20,
      backgroundColor: '#4F44FF',
      height: HeightWindow * 0.055,
      justifyContent: 'center',
      alignItems: 'center',
      width: WidthWindow * 0.65,
      borderRadius: 25,
    },
    CreateLoginText: {
      color: 'white',
      fontSize: HeightWindow * 0.021,
    },
    LoginButton: {
      marginTop:20,
      backgroundColor: 'white',
      height: HeightWindow * 0.055,
      justifyContent: 'center',
      alignItems: 'center',
      width: WidthWindow * 0.65,
      borderRadius: 25,
      borderColor: '#4F44FF',
      borderWidth: 1,
    },
    Login: {
      color: '#4F44FF',
      fontSize: HeightWindow * 0.022,
    },
  });
  