import { View, Text , ScrollView,SafeAreaView, TouchableOpacity, TouchableHighlight,Image,StyleSheet,Pressable } from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { colors,Pincode,Space,FontSize,emages} from '../../../utility/index'
import * as Haptics from 'expo-haptics';
import {Pinview,Btn} from '../../../utility/index';
import { PinContext } from '../../../context/PinContext';
import { useNavigation } from '@react-navigation/native';

const Create_passcode = () => {
  const Navigation= useNavigation();
  const{passcode,setPasscode}=useContext(PinContext);
  const Continue=()=>{
    if (passcode.toString().length == 4){
      Navigation.navigate('Confirm_passcode');
    }
  }
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white,}}>
    <View>
    <ScrollView style={{width:"70%"}}>
      
      <Space height={50}/>
        <Pressable 
        onPress={()=>Navigation.navigate('Join')}
        style={{
                      top:-20,
                      backgroundColor:colors.line,
                      width:45,
                      height:45,
                      borderRadius:100,
                      alignItems:"center",
                      justifyContent:"center",
                      alignSelf:"flex-start"
                      
                      }}>
                  <Image source={emages.Cancel} 
                  style={{width:15,height:15,tintColor:"black"}}/>
       
                      </Pressable>
                      <Pinview setInput={setPasscode} viewName="Create Pin"/>
 
               <Space height={40}/>
               
              <Btn
                Text="Continue" 
                Btncolor={colors.primary} 
                onPress={()=>Continue()}
                radius={100}
                height={55}
                disabled={passcode=="nullnullnullnull"?(true):(false)}
                />
   </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default Create_passcode