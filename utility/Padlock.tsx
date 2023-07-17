import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,ScrollView, TouchableOpacity} from 'react-native';
import {Btn,Slash,Space,colors, emages,Pinview} from './index'
import { MaterialIcons } from '@expo/vector-icons';
import { List, MD3Colors } from 'react-native-paper';
interface TpinModalProps{
  Show: boolean,
  setShow: any,
  onClick(): void 
}
const Padlock:React.FC<TpinModalProps> = ({Show,setShow,onClick}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [Pin, SetPin] = useState(true);
  return (
   <ScrollView>
     <View>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Show}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <TouchableOpacity
          onPress={()=>setShow(false)}
          style={{
                        top:-20,
                        backgroundColor:colors.line,
                        width:35,
                        height:35,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        alignSelf:"flex-end"
                        
                        }}>
                    <Image source={emages.Cancel} 
                    style={{width:10,height:10}}/>
         
                        </TouchableOpacity>
               
                      
                    <View style={{top:-30}}>
                    <Pinview setInput={SetPin} viewName="Transaction Pin"/>
                    </View>
                
          </View>
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
   
    height: "70%",
   
  
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

export default Padlock