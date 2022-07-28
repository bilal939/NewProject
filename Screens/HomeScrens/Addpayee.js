import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useState, useEffect} from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import Icon from 'react-native-vector-icons/AntDesign';
const Height = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {GetAllPayeeType, GetAllBanks} from '../Actions/Action';
import * as actionTypes from '../Actions/Actiontypes';
const Addpayee = ({navigation, GetAllPayeeType, GetAllBanks, navigate}) => {
  
  const [Isloading, Set_Loading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [Modelitems, setModelItems] = useState([]);
  const [Modelopen, setModalOpen] = useState(false);
  const [Modelvalue, setModalValue] = useState('');
  const[UtilityText,settext]=useState('');
  const[placeholderColor,setPlaceHolderColor]=useState('black')
  const[NewField,setNewFiled]=useState('Select Bank')
  useEffect(() => {
    PayeeData();
  }, []);

  const PayeeData = async () => {
    Set_Loading(true);
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const Payedata = await GetAllPayeeType(token);
    if (Payedata != 'Expired Token') {
      console.log('payedara', Payedata.length);
      Set_Loading(false);
      setItems(Payedata);
    } else {
      Set_Loading(false);
      // navigation.navigate(Login)
    }
  };
  const Typedata = async item => {
    console.log('item is', item);
    if (item == 2) {
      Set_Loading(true);
      const utility = '?type=utility';
      const type2 = await GetAllBanks(actionTypes.GetAllBanksAPI + utility);
      settext('Gas, Electric, Phone....')
      setPlaceHolderColor('#AAB8DB')
      setNewFiled('Select Utility')
      if (type2) {
        Set_Loading(false);
        console.log(type2);
      }
    } else if (item == 1) {
      const CreditCard = '?type=card';
      const type3 = await GetAllBanks(actionTypes.GetAllBanksAPI + CreditCard);
      if (type3) {
        Set_Loading(false);
        console.log(type3);
        settext('')
        setNewFiled('Select Bank')
      }
    } else {
      const Remaing = await GetAllBanks(actionTypes.GetAllBanksAPI);
      if (Remaing) {
        Set_Loading(false);
        console.log(Remaing);
        settext('')
        setNewFiled('Select Bank')
      }
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
                value={value}
                items={items}
                showTickIcon={true}
                closeAfterSelecting={true}
                setOpen={setOpen}
                // stickyHeader={true}
                onSelectItem={item => {
                  setValue(item.id);
                  Typedata(item.id);
                }}
                // zIndexInverse={999}
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
                itemKey="id"
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
              fontSize: 16
            }}
            listMode='MODAL'
            searchTextInputProps={{
              maxLength: 10
            }}     
            searchPlaceholder="Search..."
            searchPlaceholderTextColor="grey"
            searchTextInputStyle={{
              backgroundColor:'grey'
            }}
            placeholder={UtilityText ? UtilityText:'Select Bank'}
            zIndex={2000}
            zIndexInverse={2000}
            modalProps={{
              animationType: "slide",
              
            }}
            modalContentContainerStyle={{
              margin:20,
              padding:20,
              backgroundColor:'transparent',
              
            }}
               />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default connect(null, {GetAllPayeeType, GetAllBanks})(Addpayee);

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
    marginTop: 5,
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
});
