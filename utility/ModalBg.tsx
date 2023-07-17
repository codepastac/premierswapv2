import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,ScrollView, TouchableOpacity} from 'react-native';
import {Btn,Slash,Space,colors, emages,Pinview,Alerts,LoadingScreen,} from './index'


const ModalBg= () => {
  
  return (
   <ScrollView>
     <View>
      <View style={styles.centeredView}>
        
      <Modal
        animationType="none"
        transparent={true}
        visible={true}
       >
          
        <View style={styles.centeredView}>
         <ScrollView style={styles.modalView}>
                
          </ScrollView>
        </View>
       
      </Modal>
      

    </View>
    </View>
    
   </ScrollView>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   backgroundColor:"rgba(0,0,0,0.5)"
  },

  modalView: {
    
    backgroundColor: 'white',
    borderRadius:0,
    padding: 35,
   
    height: "50%",
   
  
    position: 'absolute', //Here is the trick
    bottom: 0,
    width:"100%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
     
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalBg