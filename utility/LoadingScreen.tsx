import React,{useEffect, useRef,useState} from 'react'
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,Platform} from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import {colors, emages} from './index';
import { SafeAreaView } from 'react-native-safe-area-context';
 interface LoadProps{
    Show: boolean,
    noLogo:boolean
 }

const LoadingScreen:React.FC<LoadProps> = ({Show,noLogo}) => {
  return (
    
  <View style={styles.centeredView}>
    <Modal
      //animationType="slide"
      transparent={true}
      visible={Show}
      onRequestClose={() => {
      
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <LottieView
        source={require("../assets/Animation/9965-loading-spinner.json")}
        style={{
          width: 100,
          height: 100,
        }}
        autoPlay
      />
        
        </View>
        
      </View>
    </Modal>

  
    
  </View>
    
  )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     //backgroundColor:colors.white
    
      
      
    },
    modalView: {
      margin: 10,
     
      borderRadius: 200,
      padding: 20,
      
      alignItems: 'center',
    
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
     
      fontWeight: 'bold',
      textAlign: 'center',
     color:"white"
    },
    ContentStyle: {
     
      fontFamily:'Poppins-Regular',
      textAlign: 'center',
      top:-20
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontFamily:'Poppins-Bold',
      top:-50
    },
  });
  
export default LoadingScreen