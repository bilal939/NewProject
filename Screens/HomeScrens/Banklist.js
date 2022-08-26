import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {Pressable, Modal, TextInput} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState, useEffect} from 'react';
const Banklist = ({FilteredItems, SelectBank}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [NewFilterItems, setNewFilterItems] = useState([]);

  useEffect(() => {
    if (FilteredItems) {
      setNewFilterItems([...FilteredItems]);
    }
  }, [FilteredItems]);

  const [Search, setSearchValue] = useState('');
  const Searchtext = val => {
    if (val) {
      const newData = FilteredItems.filter(item => {
        const itemData = item.bank_name
          ? item.bank_name.toUpperCase()
          : ''.toUpperCase();
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setNewFilterItems(newData);
      setSearchValue(val);
    } else {
      setNewFilterItems(FilteredItems);
      setSearchValue(val);
    }
  };

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View></View>
            <Text style={{color: 'grey', fontSize: 20, fontWeight: 'bold'}}>
              Select Bank
            </Text>
            <Entypo
              style={{
                padding: 5,
                backgroundColor: 'grey',
                borderRadius: 30,
              }}
              name="cross"
              size={20}
              color={'white'}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={'black'}
              style={styles.Searchtext}
              value={Search}
              onChangeText={val => Searchtext(val)}
            />
          </View>
          {FilteredItems.length > 0 ? (
            <View style={{padding: 10}}>
              <FlatList
                data={NewFilterItems}
                style={{height: 580}}
                showsHorizontalScrollIndicator={true}
                renderItem={({item}) => (
                  <>
                    <Pressable
                      onPress={() => SelectBank(item)}
                      style={{
                        padding: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Image
                        source={{uri: item.logo}}
                        style={{height: 50, width: 50}}
                      />
                      <Text style={{color: 'black', paddingLeft: 5}}>
                        {item.bank_name}
                      </Text>
                    </Pressable>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '95%',
                          backgroundColor: 'black',
                          height: 1,
                        }}></View>
                    </View>
                  </>
                )}
              />
            </View>
          ) : (
            <Text style={{color: 'black'}}>No data Found</Text>
          )}
        </View>
      </Modal>
    </>
  );
};

export default Banklist;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 0 / 7,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Searchtext: {
    padding: 5,
    width: '88%',
    backgroundColor: 'grey',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
});
