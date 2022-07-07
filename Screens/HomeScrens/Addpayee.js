import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import Icon from 'react-native-vector-icons/AntDesign';
const Height = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthReducer} from '../Actions/Reducer';
import {connect, useDispatch} from 'react-redux';
import {GetAllPayeeType} from '../Actions/Action';
// DropDownPicker.setListMode("SCROLLVIEW");
const Addpayee = ({navigation, AuthReducer}) => {
  const [Isloading, Set_Loading] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('hsdfuihdui');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllPayeeType());
  }, [dispatch]);

  useEffect(() => {
    if (AuthReducer.payedata != '') {
      console.log('ayth', AuthReducer.payedata);
      setItems(AuthReducer.payedata);
      Set_Loading(true);
    } else {
      console.log('else id');
    }
  }, [AuthReducer.payedata]);

  return (
    <View style={GlobalStyles.container}>
      {Isloading ? (
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
                stickyHeader={true}
                onSelectItem={item => {
                  console.log(item.type);
                  setValue(item.id);
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
                itemKey="id"
                listItemContainerStyle={{backgroundColor: 'pink'}}
                listItemLabelStyle={{color: '#AAB8DB', padding: 5}}
                schema={{
                  label: 'type',
                  value: 'id',
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={GlobalStyles.ActivityIndicator}>
          <ActivityIndicator size={20} color={'black'} />
          <Text style={{textAlign: 'center'}}>Please Wait</Text>
        </View>
      )}
    </View>
  );
};

const mapStatestoprop = state => {
  console.log('addp ayee', state.payedata);
  return {
    AuthReducer: state,
  };
};
const mapDispatchToprops = dispatch => {
  return {
    GetAllPayeeType: () => {
      dispatch(GetAllPayeeType());
    },
  };
};
export default connect(mapStatestoprop, null)(Addpayee);

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
