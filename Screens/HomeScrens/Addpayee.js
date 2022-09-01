import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Pressable,
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
import Banklist from './Banklist';
import UtilityDropDown from './UtilityDropDown';

const Addpayee = ({navigation, GetAllPayeeType, GetAllBanks, AddpayeeData}) => {



  const [Isloading, Set_Loading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [typevalue, setTypeValue] = useState('');
  const [Modelitems, setModelItems] = useState([]);
  const [NewField, setNewFiled] = useState('Select Bank');
  const [Payeename, setPayeename] = useState('');
  const [AccountNumber, setAccountNumber] = useState('');
  const [checkutility, setcheckutility] = useState('');
  const [FilteredItems, setFilteredItems] = useState([]);
  const [Type, settype] = useState('');
  const [showModal, setShowModal] = useState(false);
  const[Typeinfo,setTypeInfo]=useState([])
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
      Set_Loading(falsse);
      alert(Payedata);
    }
  };

  const ResetField = () => {
    setTypeValue('');
    setPayeename('');
    setAccountNumber('');
  };

  const Typedata = async item => {
    if (item == 2) {
      Set_Loading(true);
      const utility = '?type=utility';
      const type2 = await GetAllBanks(actionTypes.GetAllBanksAPI + utility);
      if (type2) {
        Set_Loading(false);
        setNewFiled('Select Utility');
        setModelItems(type2);
      }
    } else {
      Set_Loading(true);
      const Remaing = await GetAllBanks(actionTypes.GetAllBanksAPI);
      if (Remaing) {
        setNewFiled('Select Bank');
        Set_Loading(false);
        setModelItems(Remaing);
      }
    }
  };


  const checkvalidate = async () => {
    if (Type != '') {
      if (Typeinfo.id != '') {
        if (Payeename != '') {
          if (AccountNumber != '') {
            let Typeid = Typeinfo.id
            userfield = {Payeename, AccountNumber, Type, Typeid};
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
                  settype(item.id);
                  setcheckutility(item.type);
                  Typedata(item.id);
                  setTypeInfo('')
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
                  <UtilityDropDown
                    setModelItems={setModelItems}
                    Modelitems={Modelitems}
                    setTypeInfo={setTypeInfo}
                    Typeinfo={Typeinfo}
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
                  onPress={() => setShowModal(true)}>
                  <Text style={{color: 'black', fontSize: 18}}>
                    {Typeinfo.bank_name != null
                      ? Typeinfo.bank_name
                      : 'Select Bank'}
                  </Text>
                  <Feather name="chevron-down" color={'black'} size={20} />
                </Pressable>
              )}
              {showModal ? (
                <Banklist
                  FilteredItems={FilteredItems}
                  setTypeInfo={setTypeInfo}
                  setShowModal={setShowModal}
                />
              ) : null}

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
