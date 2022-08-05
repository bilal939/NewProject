import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Modal,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const Height = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {GetAllPayeeType, GetAllBanks, AddpayeeData} from '../Actions/Action';
import * as actionTypes from '../Actions/Actiontypes';
import Entypo from 'react-native-vector-icons/Entypo';
import Payee from './Payee';
import Banklist from './Banklist';

const Addpayee = ({
  navigation,
  GetAllPayeeType,
  GetAllBanks,
  navigate,
  AddpayeeData,
}) => {
  const [Isloading, Set_Loading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [typevalue, setTypeValue] = useState('');
  const [Modelitems, setModelItems] = useState([]);
  const [Modelopen, setModalOpen] = useState(false);
  const [Modelvalue, setModalValue] = useState('');
  const [UtilityText, settext] = useState('');
  const [placeholderColor, setPlaceHolderColor] = useState('black');
  const [NewField, setNewFiled] = useState('Select Bank');
  const [Payeename, setPayeename] = useState('');
  const [AccountNumber, setAccountNumber] = useState('');
  const [checkutility, setcheckutility] = useState('');
  const [Bank, setBank] = useState('Select Bank');
  const [modalVisible, setModalVisible] = useState(false);
  const [Search, setSearch] = useState('');
  const [FilteredItems, setFilteredItems] = useState([]);
  const [Bankid, setBankid] = useState('');
  const [Tyepid, setTypeid] = useState('');
  const [Utility, setUtility] = useState('');

  let userfield = '';

  useEffect(() => {
    PayeeData();
  }, []);

  useEffect(() => {
    if (Modelitems) {
      setFilteredItems([...Modelitems]);
    }
  }, [Modelitems]);

  const PayeeData = async () => {
    Set_Loading(true);
    const token = await AsyncStorage.getItem('token');
    const type2 = await GetAllBanks(actionTypes.GetAllBanksAPI);
    if (type2) {
      setModelItems(type2);
    }
    const Payedata = await GetAllPayeeType(token);
    if (Payedata != 'Expired Token') {
      Set_Loading(false);
      setItems(Payedata);
    } else {
      Set_Loading(false);
      alert(Payedata);
    }
  };

  

  const ResetField = () => {
    setBank('');
    setTypeValue('');
    setPayeename('');
    setAccountNumber('');
  };

  const [showModal, setShowModal] = useState(false);

  const Typedata = async item => {
    if (item == 2) {
      Set_Loading(true);
      const utility = '?type=utility';
      const type2 = await GetAllBanks(actionTypes.GetAllBanksAPI + utility);
      if (type2) {
        Set_Loading(false);
        settext('Gas, Electric, Phone....');
        setPlaceHolderColor('#AAB8DB');
        setNewFiled('Select Utility');
        setModelItems(type2);
      }
    } else {
      const Remaing = await GetAllBanks(actionTypes.GetAllBanksAPI);
      if (Remaing) {
        Set_Loading(false);
        settext('');
        setNewFiled('Select Bank');
        setModelItems(Remaing);
      }
    }
  };

  const SelectBank = item => {
    setBank(item.bank_name);
    setBankid(item.id);
    setModalVisible(!modalVisible);
  };

  const ViewModalState = () => {
    setModalVisible(!modalVisible);
    setShowModal(true);

  };

  const checkvalidate = async () => {
    if (Tyepid != '') {
      if (Bankid != '' || Utility != '') {
        if (Payeename != '') {
          if (AccountNumber != '') {
            userfield = {Payeename, AccountNumber, Tyepid, Bankid};
            const data = await AddpayeeData(userfield);
            if (data === 'Payee Created') {
              ResetField();
              alert(data);
              navigation.navigate('Payee');
            } else {
              alert(data);
            }
          } else {
            alert('Account Number cannot be empty');
          }
        } else {
          alert('Payee Name cannot be empty');
        }
      } else {
        alert('Select Bank');
      }
    } else {
      alert('Select type');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {Isloading ? (
        <View style={GlobalStyles.ActivityIndicator}>
          <ActivityIndicator size={20} color={'black'} />
          <Text style={{textAlign: 'center'}}>Please Wait</Text>
        </View>
      ) : (
        <>
          <View style={GlobalStyles.PayeeView}>
            <View style={GlobalStyles.payeeinnerView}>
              <Icon
                name="arrowleft"
                onPress={() => {
                  navigation.navigate('Payee');
                }}
                size={22}
                color={'#ffffff'}
              />

              <Text style={GlobalStyles.addpayeeBackText}>Back</Text>
              <View style={GlobalStyles.addPayeeView}>
                <Text style={GlobalStyles.addPayeText}>Add Payee</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.innercontent}>
              <Text style={styles.sameText}>Select Type</Text>
              <DropDownPicker
                open={open}
                value={typevalue}
                items={items}
                showTickIcon={true}
                closeAfterSelecting={true}
                setOpen={setOpen}
                setValue={setTypeValue}
                onSelectItem={item => {
                  console.log('itemis', item.type);
                  setTypeValue(item.type);
                  setTypeid(item.id);
                  setcheckutility(item.type);
                  Typedata(item.id);
                }}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={{borderColor: '#AAB8DB'}}
                maxHeight={100}
                style={{borderColor: '#AAB8DB'}}
                placeholderStyle={{color: '#AAB8DB', fontSize: 16}}
                placeholder="Credit Card , Utility.."
                setItems={setItems}
                zIndex={3000}
                zIndexInverse={1000}
                listItemLabelStyle={{color: '#AAB8DB', padding: 5}}
                schema={{
                  label: 'type',
                  value: 'id',
                }}
              />
              <Text
                style={{
                  color: '#6153C3',
                  fontWeight: 'bold',
                  fontSize: Height * 0.024,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                {NewField}
              </Text>
              {checkutility == 'Utility' ? (
                <>
                  <DropDownPicker
                    open={Modelopen}
                    value={Modelvalue}
                    items={Modelitems}
                    setOpen={setModalOpen}
                    setItems={setModelItems}
                    setValue={setModalValue}
                    dropDownContainerStyle={{borderColor: '#AAB8DB'}}
                    style={{borderColor: '#AAB8DB'}}
                    placeholderStyle={{
                      color: placeholderColor,
                      fontSize: 16,
                    }}
                    onSelectItem={item => {
                      setUtility(item.id);
                      setModalValue(item.bank_name);
                    }}
                    placeholder={UtilityText ? UtilityText : 'Select Bank'}
                    zIndex={2000}
                    zIndexInverse={2000}
                    maxHeight={100}
                    schema={{
                      label: 'bank_name',
                      value: 'id',
                    }}
                  />
                </>
              ) : (
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
                  <Text style={{color: 'black', fontSize: 18}}>{Bank}</Text>
                  <Feather name="chevron-down" color={'black'} size={20} />
                </Pressable>
              )}
              {showModal ? <Banklist FilteredItems={FilteredItems} SelectBank={SelectBank} modalVisible={modalVisible} setModalVisible={setModalVisible}   /> : null}
             

              <Text style={styles.sameText}>Enter Payee Name</Text>
              <TextInput
                placeholder="Payee Name"
                placeholderTextColor={'grey'}
                value={Payeename}
                style={styles.TextInput}
                onChangeText={val => setPayeename(val)}
              />
              <Text style={styles.sameText}>Enter Account #</Text>
              <TextInput
                placeholder="Account Number"
                placeholderTextColor={'grey'}
                value={AccountNumber}
                keyboardType={'numeric'}
                style={styles.TextInput}
                onChangeText={val => setAccountNumber(val)}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20,
              }}>
              <TouchableOpacity style={styles.Button} onPress={checkvalidate}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Add Payee
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default connect(null, {GetAllPayeeType, GetAllBanks, AddpayeeData})(
  Addpayee,
);

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  innercontent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sameText: {
    color: '#6153C3',
    fontWeight: 'bold',
    fontSize: Height * 0.024,
    marginTop: 15,
    marginBottom: 10,
  },
  Dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: 'grey',
  },
  TextInput: {
    padding: 10,
    color: 'grey',
    borderColor: '#AAB8DB',
    borderWidth: 1,
    borderRadius: 10,
  },
  Searchtext: {
    padding: 5,
    width: '88%',
    backgroundColor: 'grey',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  Button: {
    backgroundColor: '#6153C3',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
