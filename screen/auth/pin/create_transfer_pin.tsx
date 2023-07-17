import { View, Text , ScrollView,SafeAreaView, TouchableOpacity, TouchableHighlight,Image,StyleSheet,Pressable} from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { colors,Pincode,Space,FontSize,emages} from '../../../utility/index'
import * as Haptics from 'expo-haptics';
import {Pinview} from '../../../utility/index';
import { PinContext } from '../../../context/PinContext';
import { useNavigation } from '@react-navigation/native';

const Create_transfer_pin = () => {
  const Navigation= useNavigation();
  const{Tpin,setTpin}=useContext(PinContext);
  useEffect(()=>{
    if (Tpin.toString().length == 4){
      Navigation.navigate('Confirm_transfer_pin');
    }
  })
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white,}}>
    <ScrollView>
    <Space height={30}/>
    <Pinview setInput={setTpin} viewName="Create Transfer Pin"/>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Create_transfer_pin