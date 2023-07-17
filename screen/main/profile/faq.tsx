import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, ActivityIndicator,KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts,LoadingScreen,WebGo } from '../../../utility';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Acc_details, Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import * as Haptics from 'expo-haptics';
//import * as Linking from 'expo-linking';

const Faq = () => {
    const  navigation=useNavigation();
    const route=useRoute()
    const {header,url}= route.params as any;
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
   
    <StatusBar/>
    <TopBar Title={`${header}`} Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
   

    <WebGo urls={url}/>
   
    
   
   
    
    </SafeAreaProvider>
  )
}
 
export default Faq