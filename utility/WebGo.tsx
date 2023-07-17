import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, ActivityIndicator,KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts,LoadingScreen } from '../../../utility';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Acc_details, Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import * as Haptics from 'expo-haptics';
//import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';
interface WebGoprops{
    urls:any,
}
const WebGo:React.FC<WebGoprops> = ({urls}) => {
    
  return (
   
   
    <WebView
      style={ {
        flex: 1,
      }}
      source={{ uri: urls }}
    />
    
   
  
  )
}
 
export default WebGo