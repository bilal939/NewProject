import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
const UtilityDropDown = ({Modelitems,setModelItems,setTypeInfo,Typeinfo}) => {

    const [Modelopen, setModalOpen] = useState(false);
    const [Modelvalue, setModalValue] = useState('');
    
    const UtilityDropDowndata = item => {
        console.log('item', item);
        setTypeInfo(item)
    };

  return (
    <>
    <View style={{width:320}}>
      <DropDownPicker
        open={Modelopen}
        value={Modelvalue}
        items={Modelitems}
        setOpen={setModalOpen}
        setItems={setModelItems}
        setValue={setModalValue}
        dropDownContainerStyle={{borderColor: '#AAB8DB'}}
        style={{borderColor: '#AAB8DB'}}
        onSelectItem={item => {
            UtilityDropDowndata(item);
        }}
        placeholderStyle={{color: '#AAB8DB'}}
        placeholder={Typeinfo!=''?Typeinfo:'Gas, Electric, Phone....'}
        zIndex={2000}
        
        zIndexInverse={2000}
        maxHeight={100}
        schema={{
          label: 'bank_name',
          value: 'id',
        }}
      />
    </View>

    </>
  );
};

export default UtilityDropDown;

const styles = StyleSheet.create({});
