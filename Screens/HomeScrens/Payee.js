import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import {
  Logout,
  FectchApiPayee,
  DeletepayeeeApi,
  GetAllBanks,
} from '../Actions/Action';
import {connect, useDispatch} from 'react-redux';
import Banklist from './Banklist';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import * as actionTypes from '../Actions/Actiontypes';
import * as actiontypes from '../Actions/Actiontypes';
import {useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
const Height = Dimensions.get('screen').height;
const Payee = ({
  Logout,
  navigation,
  FectchApiPayee,
  DeletepayeeeApi,
  GetAllBanks,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      FetchData();
    }, []),
  );

  useEffect(() => {
    console.log("jsdfhsu")
    FetchBankType();
  }, []);
 
  const[showType,SetBanktype]=(false  )

  const FetchBankType = async () => {
    console.log("FETCH data 232r")
    const Remaing = await GetAllBanks(actionTypes.GetAllBanksAPI);
    if (Remaing) {
      console.log('oh waor', Remaing);
      // setBanktype(Remaing);
    }
    else{
      console.log("onscene")
    }
  };
  const [Payeedata, setPayeedata] = useState([]);
  const [Isloading, setLoading] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [Banktypes, setBanktype] = useState([]);

  const FetchData = async () => {
    console.log("FETCH data")
    setLoading(true);
    const data = await FectchApiPayee();
    if (data) {
      setLoading(false);
      console.log('jhgdjhsd', data);
      setPayeedata(data);
    } else {
      console.log('no data');
    }
  };
  const [showdata, setshowdata] = useState({
    payees_name: '',
    bank_name: '',
    account_number: '',
  });
  const dispatch = useDispatch();

  const SetChangedText = (name, value) => {
    setshowdata({
      ...showdata,
      [name]: value,
    });
  };

  const UpdateApi = item => {
    // SetBanktype(true)
    console.log('item', item.id);
  };

  const handleInput = async () => {
    console.log('logout');
    dispatch(Logout());
  };

  const ViewModalState = () => {
    setModalVisible(!modalVisible);
    
  };

  const Payetab = item => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: async () => {
            console.log('itemid', item.id);
            const DelePayee = await DeletepayeeeApi(
              actiontypes.Deletpayeeapi + item.id,
            );
            FetchData();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const EditPayee = item => {
    setshowdata(item);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={[GlobalStyles.Container, {backgroundColor: '#E3E5E8'}]}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.Payee}>Payees</Text>
      </View>

      <Pressable
        style={styles.addView}
        onPress={() => {
          navigation.navigate('AddPayee');
        }}>
        <View style={styles.OnpressableView}>
          <View style={{flexDirection: 'row', width: '88%'}}>
            <Icon name="pluscircleo" size={20} color={'#6153C3'} />
            <Text style={styles.addpayee}>Add New Payee</Text>
          </View>
          <Icon name="arrowright" size={20} color={'#6153C3'} />
          <View></View>
        </View>
      </Pressable>
      <Text style={{color: 'black', fontSize: 20, paddingLeft: 20}}>
        My payees
      </Text>
      {Isloading ? (
        <View style={GlobalStyles.ActivityIndicator}>
          <ActivityIndicator size={20} color={'black'} />
          <Text style={{textAlign: 'center'}}>Please Wait</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {Payeedata.length > 0 ? (
            <FlatList
              // style={{flex:2}}
              data={Payeedata}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <>
                  <View
                    style={{
                      marginBottom: 20,
                      padding: 10,
                      margin: 20,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      position: 'relative',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'black'}}>Payee Name</Text>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          paddingLeft: 10,
                        }}>
                        {item.payees_name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'black'}}>Title</Text>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          paddingLeft: 10,
                        }}>
                        {item.payees_name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'black'}}>Account Number</Text>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          paddingLeft: 10,
                        }}>
                        {item.account_number}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: -4,
                        flexDirection: 'row',
                        paddingLeft: 10,
                      }}>
                      <Pressable onPress={() => Payetab(item)}>
                        <Entypo
                          name="circle-with-cross"
                          color={'black'}
                          size={20}
                        />
                      </Pressable>
                      <Pressable onPress={() => EditPayee(item)}>
                        <Entypo name="edit" color={'black'} size={20} />
                      </Pressable>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}>
                        <View style={styles.modalView}>
                          <Text style={styles.sameText}>payees_name</Text>
                          <TextInput
                            placeholder="Payee Name"
                            placeholderTextColor={'grey'}
                            value={showdata.payees_name}
                            style={styles.TextInput}
                            onChangeText={value =>
                              SetChangedText('payees_name', value)
                            }
                          />
                          <Text style={styles.sameText}>Select Bank</Text>
                <Pressable
                  style={{
                    borderColor: '#AAB8DB',
                    borderWidth: 1,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                  }}
                  onPress={ViewModalState}>
                <Text style={{color: 'black', fontSize: 18}}>sdbf</Text>
                <Feather name="chevron-down" color={'black'} size={20} />
                </Pressable>
                {/* {
                  Banktypes?(
                    <Banklist showdata={showdata} />
                    
                  ):(
                    null
                  )
                } */}
                          <Text style={styles.sameText}>
                            Enter Account Number
                          </Text>
                          <TextInput
                            placeholder="Account Number"
                            placeholderTextColor={'grey'}
                            value={showdata.account_number}
                            keyboardType={'numeric'}
                            style={styles.TextInput}
                            onChangeText={value =>
                              SetChangedText('account_number', value)
                            }
                          />
                          <View style={GlobalStyles.SocialLogin}>
                            <TouchableOpacity
                              onPress={() => UpdateApi(item)}
                              style={styles.Button}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                }}>
                                Update
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => setModalVisible(!modalVisible)}
                              style={{
                                ...styles.Button,
                                backgroundColor: 'red',
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                }}>
                                Cancel
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  </View>
                </>
              )}
            />
          ) : null}
        </View>
      )}
      <View style={GlobalStyles.SubmitButtonView}>
        <TouchableOpacity
          onPress={handleInput}
          style={GlobalStyles.SubmittButton}>
          <Text style={GlobalStyles.SubmittButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect(null, {Logout,FectchApiPayee,DeletepayeeeApi,GetAllBanks})(Payee);

const styles = StyleSheet.create({
  addView: {
    height: Height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OnpressableView: {
    width: '90%',
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#AAB8DB',
    justifyContent: 'space-between',
  },
  addpayee: {
    color: 'black',
    paddingLeft: 15,
  },
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
  TextInput: {
    padding: 10,
    color: 'grey',
    borderColor: '#AAB8DB',
    borderWidth: 1,
    borderRadius: 10,
  },
  sameText: {
    color: '#6153C3',
    fontWeight: 'bold',
    fontSize: Height * 0.024,
    marginTop: 15,
    marginBottom: 10,
  },
  Button: {
    backgroundColor: 'green',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
