import { StyleSheet, Text, View ,Pressable,TouchableOpacity} from 'react-native'
import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Pratice = () => {
  const [data,setdata]=useState([
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
      from: ' Qadir',
      to: 'Steve Burdin',
      Amount: '$ 10.00',
      Date: '20/09/2022',
    },
  ])

  const renderItem = ({item}) => {
   return(
    <Pressable
    style={{
      marginBottom: 5,
      padding: 15,
      margin: 15,
      borderRadius: 10,
      backgroundColor: 'lightgrey',
    }}>
    <View
      style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{flexDirection: 'column', paddingHorizontal: 10}}>
          <Text style={styles.sameinfo}>Sender:</Text>
          <Text style={styles.sameinfo}>Reciever:</Text>
        </View>
        <View
          style={{flexDirection: 'column', paddingHorizontal: 10}}>
          <Text style={{color: '#236ca3', fontWeight: 'bold'}}>
            {item.to}
          </Text>
          <Text style={{color: '#236ca3', fontWeight: 'bold'}}>
          {item.from}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: '#7ad298', fontWeight: 'bold',textAlign:'right'}}>
        {item.Amount}
        </Text>
        <Text style={{color: '#dde0e5'}}>{item.Date}</Text>
      </View>
    </View>
</Pressable>
  )};
  
  const closeRow = (rowMap,item) => {
    rowMap[item].closeRow()
  }

  const deleteRow = (rowMap,item) => {
    closeRow(rowMap, item);
    setdata(data.filter((x) => x.id !== item)); 
  }

  const renderHiddenItem = (item,rowMap)=>{
    console.log("item",item)
    return (
      <View style={styles.rowBack}>
      <TouchableOpacity
      style={{}}
          onPress={() => deleteRow(rowMap, item.item.id)}
      >
      <AntDesign  name='delete' size={25} color={'black'} />
      </TouchableOpacity>
  </View>
    )
  }
  return (
    <View style={styles.container}>
    <SwipeListView
    data={data}
    renderItem={renderItem}
    renderHiddenItem={renderHiddenItem} 
    rightOpenValue={-50}
    disableRightSwipe={true}
    keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Pratice

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
},
backTextWhite: {
    color: '#FFF',
},
rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
},
rowBack: {
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:22,
    right:20,
    height:50,
    width:50
},

})