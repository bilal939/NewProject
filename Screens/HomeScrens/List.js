import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {Dimensions} from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const List = ({data}) => {
  const [ModalVisible, setModalVisible] = useState(false);
  const HandleTransaction = item => {
    setModalVisible(true);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#dfe0e4'}}>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
            <Pressable
              onPress={() => HandleTransaction(item)}
              style={{
                marginBottom: 5,
                padding: 15,
                margin: 15,
                borderRadius: 10,
                backgroundColor: 'white',
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
                  <Text style={{color: '#7ad298', fontWeight: 'bold',textAlign:'right',fontSize:Height*0.02}}>
                    {item.Amount}
                  </Text>
                  <Text style={{color: '#dde0e5',fontSize:Height*0.015}}>{item.Date}</Text>
                </View>
              </View>
            </Pressable>
          </>
        )}
      />
      <Modal
        
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
  >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                width: Width / 1.25,
              },
            ]}>
            <View
              style={styles.SimpleRow}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Height * 0.026,
                  color: '#000',
                }}>
                Transaction Details
              </Text>
              
          </View>
        
          <View style={styles.divider}/> 
           <View style={styles.Subview}>
            <View style={{marginTop:10,marginBottom:10}}>
           <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Height * 0.022,
                  color: 'grey',
                }}>
                Sender Details
              </Text>
           
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Name:</Text>
              <Text style={styles.BoldText}>Muhammad Bilal</Text>
            </View>

            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Amount:</Text>
              <Text style={styles.BoldText}>$100.0</Text>
            </View>
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Country:</Text>
              <Text style={styles.BoldText}>Us</Text>
            </View>

            </View>
            <View style={{marginTop:25,marginBottom:10}}>
           <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Height * 0.022,
                  color: 'grey',
                }}>
                Reciever Details
              </Text>
            
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Name:</Text>
              <Text style={styles.BoldText}>Muhammad Bilal</Text>
            </View>
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Amount:</Text>
              <Text style={styles.BoldText}>$100.0</Text>
            </View>
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Country:</Text>
              <Text style={styles.BoldText}>Us</Text>
            </View>
            </View>
            <View style={{marginTop:25,marginBottom:30}}>
           <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Height * 0.022,
                  color: 'grey',
                }}>
                Fees Details
              </Text>
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Transaction Type</Text>
              <Text style={styles.BoldText}>Muhammad Bilal</Text>
            </View>
            <View style={styles.SimpleRow}>
              <Text style={styles.LightText}>Fee Amount</Text>
              <Text style={styles.BoldText}>$100.0</Text>
            </View>
            </View>
            </View>
            <Pressable onPress={() => setModalVisible(!ModalVisible)}>
            <Text style={{textAlign: 'right', color: '#7472DE'}}>Close</Text>
          </Pressable>
         </View>
        </View>
      </Modal>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  sameinfo: {
    color: 'black',
  },
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: Width / 1.12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor:'grey',
    borderWidth:2

  },
  Subview: {
    fontSize: Width * 0.033,
    paddingHorizontal:10,
  },


  SimpleRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    opacity: 0.5,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  LightText:{
    color:'black',
    fontWeight:'400'
  }
  ,
  BoldText:{
    fontWeight:'bold',
    color:'black'
  }
});
