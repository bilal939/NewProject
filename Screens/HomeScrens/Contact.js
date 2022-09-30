import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import GlobalStyles from '../Styles/GlobalStyles';
import {connect} from 'react-redux';
import {AddContacts, Logout} from '../Actions/Action';
import Contacts from 'react-native-contacts';
import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  GetContacts,
  DeleteContacts,
  UpdateContacts,
  GetCountriesCodes,
} from '../Actions/Action';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Banklist from './Banklist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as actionTypes from '../Actions/Actiontypes';
import {HeightWindow} from '../DimesionsScreen/ScreenDimesnions';
import {WidthWindow} from '../DimesionsScreen/ScreenDimesnions';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Contact = ({
  GetContacts,
  GetCountriesCodes,
  AddContacts,
  DeleteContacts,
  UpdateContacts,
}) => {
  useEffect(() => {
    AllContacts();
  }, []);

  useEffect(() => {
    GetCountry();
  }, []);

  useEffect(() => {
    RequestContactAccess();
  }, []);

  const [NewContact, SetContacts] = useState([]);
  const [AddedContacts, SetAddedContactts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [Contactitems, SetContactitems] = useState([]);
  const [FilteredItems, setFilteredItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [Typeinfo, setTypeInfo] = useState([]);
  const [Title, SetTitle] = useState('Contact');
  const [Isloading, Set_Loading] = useState(false);
  const [Updatemodal, setUpdateModal] = useState(false);
  const [Code, setshowcode] = useState(false);
  const [Selectcode, SetSelectcode] = useState('NoCode');

  const SetNum = () => {
    if (showdata.phone_no && Selectcode === 'Codeselect') {
      const mydata =
        Typeinfo.iso_codes +
        '_' +
        Typeinfo.country_codes +
        '_' +
        showdata.phone_no;
      console.log('mydata', mydata);
      return mydata;
    } else {
      return showdata.phone_no;
    }
  };

  const ResetField = () => {
    setshowdata({sfull_name: '', email: '', phone_no: ''});
    setTypeInfo('');
  };

  const RequestContactAccess = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts App Permissions',
          message: 'Allow Brytt To have Access to Your Contacts',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll().then(contacts => {
          SetContacts(contacts);
        });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const AddContact = async () => {
    if (showdata.full_name != '') {
      if (Typeinfo.length != 0 || showdata.phone_no != '') {
        if (showdata.phone_no != '') {
          if (showdata.email != '') {
            console.log('num', SetNum());
            let number = SetNum();
            setModalVisible(!modalVisible);
            Set_Loading(true);
            setTypeInfo('');
            const data = await AddContacts(
              showdata.full_name,
              showdata.email,
              number,
            );
            if (data === 200) {
              console.log('data', data);
              setshowcode(false);
              Set_Loading(false);
              AllContacts();
              ResetField();
            } else {
              alert(data);
              Set_Loading(false);
              alert(data);
            }
          } else {
            alert('Email cannot be valied');
            return;
          }
        } else {
          alert('Phone number cannot be empty');
          return;
        }
      } else {
        alert('Select Country Code ');
        return;
      }
    } else {
      alert('Name cannot be empty');
      return;
    }
  };

  const AllContacts = async () => {
    const data = await GetContacts();
    if (data) {
      console.log('Contacts are ', data);
      SetAddedContactts(data);
    }
  };

  const Delete = item => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            Set_Loading(true);
            console.log('itemid', item);
            const DeletCon = await DeleteContacts(
              actionTypes.DeleteContactApi + item.item.id,
            );
            AllContacts();
            Set_Loading(false);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const GetCountry = async () => {
    const Country = await GetCountriesCodes();
    if (Country) {
      setFilteredItems(Country);
    }
  };

  const EditContact = item => {
    console.log('item to edit', item);
    setUpdateModal(true);

    // setshowdata({
    //   // id:item.id,
    //   full_name: item.full_name,
    //   email: item.email,
    //   phone_no: item.phone_no,
    // });
//     setshowdata({...showdata, ,       full_name: item.full_name,
//       email: item.email,
//       phone_no: item.phone_no,
// });

    setshowdata(item);
    console.log(item.id, showdata.id, "asdasdasasad")
  };

  const UpdateApi = async item => {
    console.log("item",item)
    setUpdateModal(!Updatemodal);
    Set_Loading(true);
    let num = SetNum()
    console.log("num",num);
    const Updatadata = await UpdateContacts(
      actionTypes.UpdateContactsApi + showdata.id,
      item.full_name,item.email,num
    );
    console.log('updated ata', Updatadata);
    if (Updatadata) {
      Set_Loading(false);
      AllContacts();
    } else {
      Set_Loading(false);
      alert(Updatadata);
    }
  };

  const [showdata, setshowdata] = useState({
    id:null,
    full_name: '',
    email: '',
    phone_no: '',
  });

  const SetChangedText = (name, value) => {
    setshowdata({
      ...showdata,
      [name]: value,
    });
  };

  const setdata = item => {
    console.log('item to set on modal', item);
    setshowdata({
      id:item.id,
      full_name: item.givenName,
      email: item.emailAddresses[0]?.email,
      phone_no: item.phoneNumbers[0]?.number,
    });
    SetContactitems([]);
    setshowcode(true);
    SetSelectcode('')
    setTypeInfo('')
  };

  const findFilm = val => {
    SetContactitems([]);
    if (val) {
      const newData = NewContact.filter(item => {
        const itemData = item.givenName
          ? item.givenName.toUpperCase()
          : ''.toUpperCase();
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('newdata2', newData);
      SetContactitems(newData);
      setshowdata({full_name: val});
    } else {
      console.log('else');
      SetContactitems([]);
      setshowdata({full_name: val});
      setshowcode(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => EditContact(item)}
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          padding: 5,
          margin: 10,
          backgroundColor: 'grey',
          borderRadius: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: WidthWindow * 0.2,
          }}>
          <FontAwesome color={'black'} name="user-circle" size={25} />
        </View>
        <View style={{flexDirection: 'column', width: WidthWindow * 0.4}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            {item.full_name}
          </Text>
          <Text style={{color: 'black'}}>{item.phone_no}</Text>
          <Text style={{color: 'black'}}>{item.email}</Text>
        </View>
        <View></View>
      </Pressable>
    );
  };

  const renderHiddenItem = item => {
    return (
      <View style={styles.rowBack}>
        <Pressable
          onPress={() => Delete(item)}
          style={{
            width: WidthWindow * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="trash-o" color={'red'} size={25} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
      {Isloading ? (
        <View style={GlobalStyles.ActivityIndicator}>
          <ActivityIndicator size={20} color={'black'} />
          <Text style={{textAlign: 'center'}}>Please Wait</Text>
        </View>
      ) : null}
      <SwipeListView
        data={AddedContacts}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-50}
        disableRightSwipe={true}
        keyExtractor={item => item.id}
      />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            console.log('Add Button');
            setModalVisible(true);
            ResetField()
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Add Contact
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        style={{
          backgroundColor: '#000000',
          opacity: 0.9,
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: WidthWindow * 0.9999,
        }}
        onBackdropPress={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.modalView}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '900',
              fontSize: HeightWindow * 0.03,
              color: 'black',
              paddingVertical: 10,
            }}>
            Add Contact
          </Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor={'grey'}
            style={styles.TextInput}
            value={showdata.full_name}
            onChangeText={val => findFilm(val)}
          />
          {Contactitems.length != 0 ? (
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 20,
                padding: 8,
                height: HeightWindow * 0.1,
                width: WidthWindow * 0.7,
                borderColor: '#AAB8DB',
                borderWidth: 1,
              }}>
              <FlatList
                data={Contactitems}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
                keyExtractor={item => item.rawContactId}
                renderItem={({item}) => (
                  <>
                    <Pressable
                      style={{
                        padding: 8,
                      }}
                      onPress={() => setdata(item)}>
                      <Text style={{color: 'black', fontSize: 8}}>
                        {item.givenName}
                      </Text>
                      <Text style={{color: 'black', fontSize: 8}}>
                        {item.phoneNumbers[0]?.number}
                      </Text>
                      <Text style={{color: 'black', fontSize: 8}}>
                        {item.emailAddresses[0]?.email}
                      </Text>
                    </Pressable>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: 'black',
                          width: '90%',
                        }}></View>
                    </View>
                  </>
                )}
              />
            </View>
          ) : null}
          {Contactitems.length == 0 ? (
            Code ? (
              <>
                <View
                  style={[
                    styles.TextInput,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <TextInput
                    placeholder="Enter Phonenumber"
                    placeholderTextColor={'grey'}
                    keyboardType={'numeric'}
                    value={showdata.phone_no}
                    onChangeText={value => SetChangedText('phone_no', value)}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 8,
                    }}>
                    <Ionicons
                      onPress={() => {
                        setshowdata({
                          phone_no: '',
                          full_name: showdata.full_name,
                          email: showdata.email,
                        });
                        setshowcode(false);
                      }}
                      name="close"
                      size={25}
                      color={'grey'}
                    />
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.FalseCondition}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setShowModal(true);
                    SetSelectcode('Codeselect');
                  }}>
                  {Typeinfo.length != 0 ? (
                    <Image
                      source={{
                        uri:
                          Typeinfo.length != 0 ? Typeinfo.flags_uri : undefined,
                      }}
                      style={{height: 40, width: 40}}
                    />
                  ) : null}
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'black'}}>
                      {Typeinfo.length == 0
                        ? 'Select Code'
                        : Typeinfo.country_codes}
                    </Text>
                    <Feather
                      style={{paddingLeft: 10}}
                      name="chevron-down"
                      color={'black'}
                      size={20}
                    />
                  </View>
                </Pressable>
                {showModal ? (
                  <Banklist
                    FilteredItems={FilteredItems}
                    setShowModal={setShowModal}
                    setTypeInfo={setTypeInfo}
                    Title={Title}
                  />
                ) : null}
                <TextInput
                  placeholder="Enter Phonenumber"
                  placeholderTextColor={'grey'}
                  style={Code ? styles.TextInput : {color: 'black'}}
                  keyboardType={'numeric'}
                  value={showdata.phone_no}
                  onChangeText={value => SetChangedText('phone_no', value)}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 8,
                  }}>
                  <Ionicons
                    onPress={() => {
                      setshowcode(false);
                    }}
                    name="close"
                    size={25}
                    color={'grey'}
                  />
                </View>
              </View>
            )
          ) : null}
          <TextInput
            placeholder="Enter Email Address"
            placeholderTextColor={'grey'}
            style={styles.TextInput}
            value={showdata.email}
            onChangeText={value => SetChangedText('email', value)}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={styles.ModalButton}
              onPress={() => AddContact()}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Add Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ModalButton}
              onPress={() => {
                ResetField();
                setModalVisible(false);
                setshowcode(false);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        style={{
          backgroundColor: '#000000',
          opacity: 0.9,
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animationType="slide"
        transparent={true}
        visible={Updatemodal}>
        <View style={styles.modalView}>
          <TextInput
            placeholderTextColor={'grey'}
            value={showdata.full_name}
            style={styles.TextInput}
            onChangeText={value => SetChangedText('full_name', value)}
          />
          {Code === false ? (
            <>
              <View
                style={[
                  styles.TextInput,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <TextInput
                  placeholder="Enter Phonenumber"
                  placeholderTextColor={'grey'}
                  style={{color:'black'}}
                  keyboardType={'numeric'}
                  value={showdata.phone_no}
                  onChangeText={value => SetChangedText('phone_no', value)}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 8,
                  }}>
                  <Ionicons
                    onPress={() => {
                      setshowdata({
                        phone_no: '',
                        full_name: showdata.full_name,
                        email: showdata.email,
                      });
                      setshowcode(true)
                    }}
                    name="close"
                    size={25}
                    color={'grey'}
                  />
                </View>
              </View>
            </>
          ) : (
            <View style={styles.FalseCondition}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setShowModal(true);
                  SetSelectcode('Codeselect');
                }}>
                {Typeinfo.length != 0 ? (
                  <Image
                    source={{
                      uri:
                        Typeinfo.length != 0 ? Typeinfo.flags_uri : undefined,
                    }}
                    style={{height: 40, width: 40}}
                  />
                ) : null}
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: 'black'}}>
                    {Typeinfo.length == 0
                      ? 'Select Code'
                      : Typeinfo.country_codes}
                  </Text>
                  <Feather
                    style={{paddingLeft: 10}}
                    name="chevron-down"
                    color={'black'}
                    size={20}
                  />
                </View>
              </Pressable>
              {showModal ? (
                <Banklist
                  FilteredItems={FilteredItems}
                  setShowModal={setShowModal}
                  setTypeInfo={setTypeInfo}
                  Title={Title}
                />
              ) : null}
              <TextInput
                placeholder="Enter Phonenumber"
                placeholderTextColor={'black'}
                style={{color:'black'}}
                keyboardType={'numeric'}
                value={showdata.phone_no}
                onChangeText={value => SetChangedText('phone_no', value)}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 8,
                }}>
                <Ionicons
                  onPress={() => {
                    ResetField();
                    setshowcode(false);
                  }}
                  name="close"
                  size={25}
                  color={'grey'}
                />
              </View>
            </View>
          )}

          <TextInput
            placeholderTextColor={'grey'}
            value={showdata.email}
            style={styles.TextInput}
            onChangeText={value => SetChangedText('email', value)}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={styles.ModalButton}
              onPress={() => UpdateApi(showdata)}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ModalButton}
              onPress={() => {
                setUpdateModal(!Updatemodal);
                setshowcode(false)
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default connect(null, {
  Logout,
  GetContacts,
  GetCountriesCodes,
  AddContacts,
  DeleteContacts,
  UpdateContacts,
})(Contact);

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#6153C3',
    width: '40%',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    elevation: 8,
    borderRadius: 20,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    // backgroundColor: '#000000',
    // opacity: 0.5
  },
  ModalButton: {
    marginTop: 10,
    width: WidthWindow * 0.7,
    height: HeightWindow * 0.06,
    marginBottom: 5,
    backgroundColor: '#6153C3',
    paddingHorizontal: 8,
    paddingVertical: 9,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    padding: 10,
    color: 'grey',
    borderColor: '#AAB8DB',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,

    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    height: 100,
    backgroundColor: 'black',
    // backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  FalseCondition: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 8,
    color: 'grey',
    borderColor: '#AAB8DB',
    borderWidth: 1,
    borderRadius: 10,
    width: WidthWindow * 0.8,
    justifyContent: 'space-between',
  },
  rowBack: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 20,
    height: 50,
    width: 50,
  },
});
