import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Globalstyles from '../Styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import {useState} from 'react';
const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;

const Customer = () => {
  const [Userdata, SetUserdata] = useState({
    Name: '',
    Phone: '',
    Email: '',
    DOB: '',
    Address: '',
    ID: '',
  });
  const[isImage,isImageset]=useState(false);
  const getFirstChar = str => {
    const firstChars = str
      .split(' ')
      .map(word => word[0])
      .join('');
    return firstChars;
  }
  return (
    <View style={[Globalstyles.Container, {backgroundColor: '#dfe0e4'}]}>
      <View style={{marginTop: 40, paddingHorizontal: 20}}>
        <View style={styles.sametab}>
          <View style={styles.IconView}>
            <Ionicons name="exit-outline" size={25} color={'black'} />
          </View>
          <View style={styles.TextView}>
            <Text style={styles.LightText}>Send</Text>
            <Text style={styles.BoldText}>From</Text>
            <Text style={[styles.LightText, {marginLeft: 6}]}>
              this Customer
            </Text>
          </View>
        </View>
        <View style={[styles.sametab, {marginTop: 20}]}>
          <View style={styles.IconView}>
            <Ionicons name="exit-outline" size={25} color={'black'} />
          </View>
          <View style={styles.TextView}>
            <Text style={styles.LightText}>Send</Text>
            <Text style={styles.BoldText}>To</Text>
            <Text style={[styles.LightText, {marginLeft: 6}]}>
              this Customer
            </Text>
          </View>
        </View>

        <View style={styles.updateTabView}>
          <View style={{flexDirection: 'row', height:Height*0.14}}>
            {
              isImage?(
                <View style={{width: Width * 0.24,justifyContent:'center',alignItems:'center'}}>

                </View>
              ):(
                <View style={{width: Width * 0.25,justifyContent:'center',alignItems:'center'}}>
                  <View style={{backgroundColor:'#e2ddf6',borderRadius:50,padding:15}}>
                  <Text style={{color:'#7c7c7b',fontWeight:'600',fontSize:Height*0.033}}>{getFirstChar('Steve Durbin')}</Text>
                </View>
                </View>
                
              )
            }
           
            <View style={{justifyContent: 'center'}}>
              <Text
                style={styles.NameText}>
                Steve Durbin
              </Text>
            </View>
          </View>
          <View style={styles.RowView}>
            <View style={styles.Minirow}>
              <Text style={[styles.LightModalText,{fontWeight:'600'}]}>Phone:</Text>
            </View>
            <Text style={styles.LightModalText}>+923112388411</Text>
          </View>
          <View style={styles.RowView}>
            <View style={styles.Minirow}>
              <Text style={[styles.LightModalText,{fontWeight:'600'}]}>Email:</Text>
            </View>
            <Text style={styles.LightModalText}>steverdurbin@gmail.com</Text>
          </View>
          <View style={styles.RowView}>
            <View style={styles.Minirow}>
              <Text style={[styles.LightModalText,{fontWeight:'600'}]}>DOB:</Text>
            </View>

            <Text style={styles.LightModalText}>onfile</Text>
          </View>
          <View style={styles.RowView}>
            <View style={styles.Minirow}>
              <Text style={[styles.LightModalText,{fontWeight:'600'}]}>Address:</Text>
            </View>
            <Text style={styles.LightModalText}>onfile</Text>
          </View>
          <View style={styles.RowView}>
            <View style={styles.Minirow}>
              <Text style={[styles.LightModalText,{fontWeight:'600'}]}>ID:</Text>
            </View>
            <Text style={styles.LightModalText}>none </Text>
          </View>
          <View style={{height: Height * 0.10}}></View>
          <View style={styles.ButtonView}>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.Buttontext}>Edit Customer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  sametab: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderColor:'silver',
    borderWidth:1
  },
  IconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width:Width*0.18,
    height:Height*0.057
  },
  BoldText: {
    color: 'black',
    fontWeight:'900',
    marginLeft: 5,
    fontSize: Height * 0.024,
  },
  TextView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  LightText: {
    color: 'black',
    fontSize: Height * 0.022,
    fontWeight:'400',
  },
  Button: {
    backgroundColor: '#7373de',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  LightModalText: {
    color: 'black',
    fontSize: Height * 0.021,
    fontWeight: '400',
  },
  RowView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor:'white'
  },
  updateTabView: {
    paddingHorizontal: 10,
    paddingVertical:5,
    borderRadius: 55,
    marginTop: 30,
    backgroundColor: 'white',
    borderColor:'silver',
    borderWidth:1
  },
  ButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  NameText:{
    color: 'black',
    fontSize: Height * 0.037,
    fontWeight: '900',
  
  },
  Minirow:{
    width:Width*0.21
  }
});
