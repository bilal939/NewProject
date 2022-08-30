import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Homestack';
import Send from '../Screens/HomeScrens/Send';
import Recieve from '../Screens/HomeScrens/Recieve';
import Contact from '../Screens/HomeScrens/Contact';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarIcon:({focused,color,size})=>{
        let iconame;
        if (route.name=='Home') {
          iconame = focused
          ?'ios-home':'ios-home-outline'
          
        } 
        else if (route.name == 'Send') {
          iconame = focused ? 'exit-sharp':'exit-outline'
        }
        else if (route.name == 'Recieve') {
          iconame = focused ? 'md-restaurant-sharp':'md-restaurant-outline'
        }

        else if (route.name == 'Contact') {
          iconame = focused ? 'person':'person-outline'
        }

        return <Ionicons name={iconame} size={size} color={color}/>
      },
      tabBarActiveTintColor:'blue',
      tabBarInactiveTintColor:'black',
      headerShown:false,
      tabBarHideOnKeyboard:true
      
    })
  }
    >
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Send' component={Send}/>
      <Tab.Screen name='Recieve' component={Recieve} />
      <Tab.Screen name='Contact' component={Contact} />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})