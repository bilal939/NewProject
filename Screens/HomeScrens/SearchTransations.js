import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
import Octicons from 'react-native-vector-icons/Octicons';
import List from './List';
import Customer from './Customer';
import FeesManagement from './FeesManagement';

const SearchTransations = ({navigation}) => {
  const data = [
    {id:1,from:'Abdul Qadir',to:'Steve Burdin',Amount:'$ 10.00',Date:'20/09/2022'},
    {id:2,from:'Abdul Qadir',to:'Steve Burdin',Amount:'$ 10.00',Date:'20/09/2022'},
    {id:3,from:'Abdul Qadir',to:'Steve Burdin',Amount:'$ 10.00',Date:'20/09/2022'},
    {id:4,from:'Abdul Qadir',to:'Steve Burdin',Amount:'$ 10.00',Date:'20/09/2022'},
    {id:5,from:'Abdul Qadir',to:'Steve Burdin',Amount:'$ 10.00',Date:'20/09/2022'}
  ]
  return (
    <View style={[GlobalStyles.Container,{backgroundColor:'#dfe0e4'}]}>
        <View style={{marginTop:10}}>

        </View>
      <View style={styles.TabView}>
      <View style={styles.IconView}>
       <MaterialIcons name='delivery-dining' size={25} color={'black'}/>
      </View>
      <View style={styles.TextView}>
       <Text style={styles.Sametext}>Deliver Funds</Text>
      </View>
      <View style={styles.BadgeView}>
        <Text style={{color:'black'}}>2</Text>
      </View>
      </View>
      <Pressable onPress={()=>navigation.navigate('Customer')} style={styles.TabView}>
      <View style={styles.IconView}>
       <Octicons name='people' size={25} color={'#687ead'}/>
      </View>
      <View style={styles.TextView}>
    <Text style={styles.Sametext}>Existing Customers</Text>
    <Text style={styles.sameMinitext}>Start Transactions</Text>
      </View>
      </Pressable>
      <View style={styles.TabView}>
      <View style={styles.IconView}>
       <Octicons name='people' size={25} color={'#687ead'}/>
      </View>
      <View style={styles.TextView}>
      <Text style={styles.Sametext}>New Customers</Text>
      <Text style={styles.sameMinitext}>Start Transactions</Text>
      </View>
      </View>
      <Pressable onPress={()=>navigation.navigate('FeesManagement')}  style={styles.TabView}>
      <View style={styles.IconView}>
      <MaterialIcons name='folder' size={25} color={'#687ead'}/>
      </View>
      <View style={styles.TextView}>
      <Text style={styles.Sametext}>Fees Management</Text>
      </View>
      </Pressable>
      <Text style={{color:'#807f84',fontWeight:'bold',paddingLeft:10,fontSize:15}}>Recent Transations</Text>
       <List data={data}/>
    </View>
  )
}

export default SearchTransations

const styles = StyleSheet.create({
  TabView:{
    marginTop:10,
    marginBottom:10,
    marginHorizontal:20,
    height:Height*0.071,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'white',
    borderColor:'silver',
    borderWidth:1,
  },
  IconView:{
    paddingHorizontal:20,
    justifyContent:'center',
    alignItems:'center'
  },
  TextView:{
    justifyContent:'center',
    paddingLeft:Width*0.02
  },
  Sametext:{
    color:'#4c7fb8',
    fontSize:Height*0.022,
    fontWeight:'500'
  },
  sameMinitext:{
    fontSize:Height*0.018,
    color:'silver',
    fontWeight:'400',
    marginTop:3
  },
  BadgeView:{
    backgroundColor:'#faff03',
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    right:-5,
    top:-10, 
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderColor:'black',
    borderWidth:2
  }
})