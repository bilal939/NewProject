import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import List from './List';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const FeesManagement = () => {
  const data = [
    {
      id: 1,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 2,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 3,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 4,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 5,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 6,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 7,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 8,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 9,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
    {
      id: 10,
      from: 'Abdul Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
  ];
  const [FeesEarned, SetFeesEarned] = useState('$1.2,345 USD');
  const [FeesPaid, setFeespaod] = useState('Well Fargo x0123');
  const [tabData, setTabData] = useState({
    current: false,
    year: false,
    all: false,
  });

  return (
    <View style={[GlobalStyles.Container, {backgroundColor: '#dfe0e4'}]}>
      <View style={{marginTop: 10}}></View>
      <View style={styles.InitiallView}>
        <Text style={{color: 'black', fontSize: Height * 0.026,fontWeight:'500'}}>
          Fees Earned :
        </Text>
        <Text
          style={styles.FeesEarnedText}>
          {FeesEarned}
        </Text>
      </View>
      <View style={styles.TabView}>
        <Pressable
          onPress={() =>
            setTabData({
              ...tabData,
              year: false,
              current: true,
              all: false,
            })
          }
          style={[
            styles.sametab,
            {backgroundColor: tabData.current ? '#7273dd' : '#ffffff'},
          ]}>
          <Text style={{color:tabData.current ? '#ffffff' : '#7273dd' }}>Current Month</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setTabData({
              ...tabData,
              year: true,
              current: false,
              all: false,
            })
          }
          style={[
            styles.sametab,
            {backgroundColor: tabData.year ? '#7273dd' : '#ffffff',marginLeft:15},
          ]}>
          <Text style={{color:tabData.year ? '#ffffff' : '#7273dd' }}>Year To Date</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setTabData({
              ...tabData,
              year: false,
              current: false,
              all: true,
            })
          }
          style={[styles.sametab, {backgroundColor: tabData.all ? '#7273dd' : '#ffffff',marginLeft:15 }]}>
          <Text style={{color:  tabData.all ? '#ffffff' : '#7273dd'}}>All Fees</Text>
        </Pressable>

      </View>
      <View style={[styles.InitiallView]}>
        <Text style={{color: 'black',fontSize:Height*0.022,fontWeight:'500'}}>Fees paid too :</Text>
        <Text style={styles.FeesPaidText}>{FeesPaid}</Text>
      </View>

      <View style={styles.InitiallView}>
        <Pressable style={styles.sametab2}>
          <Text style={styles.UpdateFeetabText}>
            Update/Change Account
          </Text>
        </Pressable>
        <Pressable style={[styles.sametab2,{marginLeft:18}]}>
          <Text style={styles.UpdateFeetabText}>
            Fees Disclosures and Calculations
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          color: '#807f84',
          fontWeight: 'bold',
          paddingLeft: 20,
          fontSize: 15,
          marginTop: 18,
        }}>
        Recent Fees
      </Text>
      <List data={data} />
    </View>
  );
};

export default FeesManagement;

const styles = StyleSheet.create({
  sametab: {
    // paddingVertical: 10,
    height: Height * 0.055,
    width: Width * 0.26,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor:'silver',
    borderWidth:2,
    // marginRight:5
  },
  sametab2: {
    paddingVertical: 5,
    height: Height * 0.072,
    width: Width * 0.42,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor:'silver',
    borderWidth:2
  },
  TabView: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal:50,
  },
  InitiallView: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  FeesPaidText:{
    color: 'black', 
    fontWeight: '500',
    fontSize:Height*0.023,
    paddingLeft:30
  },
  UpdateFeetabText:{
    color: '#7273dd', textAlign: 'center'
  },
  FeesEarnedText:{
    color: 'black', 
    fontWeight: 'bold',
     fontSize: Height * 0.034
  }
});
