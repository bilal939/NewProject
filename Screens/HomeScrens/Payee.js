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
  UpdatadataPayee,
} from '../Actions/Action';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import * as actionTypes from '../Actions/Actiontypes';
import {useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Banklist from './Banklist';
const Height = Dimensions.get('screen').height;
const Payee = ({
  Logout,
  navigation,
  FectchApiPayee,
  DeletepayeeeApi,
  GetAllBanks,
  UpdatadataPayee
}) => {


  useFocusEffect(
    React.useCallback(() => {
      FetchData();
    }, []),
  );

  useEffect(() => {
    FetchBankType();
  }, []);
  
  useEffect(()=>{
    if(Payeedata.length<0){
      setPayeename('')
      setAccountNumber('')
      setbankname('')
    }
  },[])

  const[FilteredItems,setFilteredItems]=useState([])
  const [Payeedata, setPayeedata] = useState([]);
  const [Isloading, setLoading] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const[checkBank,setBank]=useState(null)
  const [bank,ShowBanklist]=useState(false)
  const[bankid,setBankid]=useState(null)
  const [payeename,setPayeename]=useState(null)
  const[bankname,setbankname]=useState(null);
  const[account_number,setAccountNumber]=useState(null)



  const FetchBankType = async () => {

    const Remaing = await GetAllBanks(actionTypes.GetAllBanksAPI);
    if (Remaing) {
      setFilteredItems(Remaing)
    } else {
      console.log('onscene');
    }
  };
  

  const FetchData = async () => {
    console.log('fetching payee data that is bieng added');
    setLoading(true);
    const data = await FectchApiPayee();
    if (data!='Expired token') {
      setLoading(false);
      setPayeedata(data);
    } else {
      setLoading(false)
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
 
  
  
  const SelectBank = item => {
    setBankid(item.id)
    setBank(item.bank_name);
    ShowBanklist(!bank)
  };


  const UpdateApi = async item => {
    setLoading(true)
    const Updatadata = await UpdatadataPayee(actionTypes.UpdateFecthApipayee+item.id,item,bankid)
    if(Updatadata){     
      setPayeename(Updatadata.payees_name) 
      console.log("asdh",Updatadata.bank.bank_name)
      setbankname(Updatadata.bank.bank_name) 
      setAccountNumber(Updatadata.account_number)                              
      setLoading(false)
      setModalVisible(!modalVisible)
    }
    else{
      setLoading(false)
      alert(Updatadata)
    }
  };


  const handleInput = async () => {
    console.log('logout');
    dispatch(Logout());
  };


  const Payetab = item => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            console.log('itemid', item.id);
            const DelePayee = await DeletepayeeeApi(
              actionTypes.Deletpayeeapi + item.id,
            );
            FetchData();
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const EditPayee = item => {
    console.log("item to edit",item)
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
                        {payeename==null?item.payees_name:payeename}
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
                        {bankname==null?item.bank?.bank_name:bankname}
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
                        {account_number==null?item.account_number:account_number}
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
                          onPress={()=>ShowBanklist(!bank)}
                          > 
                          
                         <Text style={{color:'black'}}>{checkBank==null?showdata.bank?.bank_name:checkBank}</Text>   
                              
                                               
                          <Feather name="chevron-down" color={'black'} size={20} />
                          {bank?<Banklist FilteredItems={FilteredItems}   SelectBank={SelectBank} />:null}
                          </Pressable>
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
                              onPress={() => UpdateApi(showdata)}
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

export default connect(null, {
  Logout,
  FectchApiPayee,
  DeletepayeeeApi,
  GetAllBanks,
  UpdatadataPayee
})(Payee);

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
