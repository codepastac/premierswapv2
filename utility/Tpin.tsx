import React, {useContext, useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,ScrollView, TouchableOpacity} from 'react-native';
import {Btn,Slash,Space,colors, emages,Pinview,Alerts,LoadingScreen} from './index'
import { MaterialIcons } from '@expo/vector-icons';
import { List, MD3Colors } from 'react-native-paper';
import { CheckPin } from '../screen/service';
import { StorageGet } from '../service/storage';
import { ToastContext } from '../context/AlertContext';
import { PinContext } from '../context/PinContext';
interface TpinModalProps{
  Show: boolean,
  setShow: any,
  PStatus:any,
  
  onClick(): void 
}
const Tpins:React.FC<TpinModalProps> = ({Show,setShow,PStatus,onClick}) => {
  const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 
  const {Transaction_done,setTDone}=useContext(PinContext);
  const [modalVisible, setModalVisible] = useState(true);
   
 
 
  const [Pin, SetPin] = useState(0);
  const [Loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [chance,setChance]=useState(4);
  const close=()=>{
    setError(false);
  }
  useEffect(()=>{
   
   if (Pin.toString().length == 4) {
    setLoading(true)
    StorageGet("@app_login_code").then((db)=>{
      let payload=JSON.stringify({
        pincode:Pin,
        type:"Tpins",
        appcode:db
      });
      CheckPin(payload)
      .then((req)=>{
        console.log(req?.data);
        if (req?.data.error == false) {
         
          onClick();
         
          //setShow(false);
        
          //setLoading(false);
          //setError(true);
         
         
        } else {
          if (chance == 0) {
            //CALL LOCK ACCOUT
            EnableToast(true)

            setTitle("Account Disabled!");
            setEtype("Error")
            setMsg(`Your account has been disabled for 3 hours for 4 failed pin attempt, please contact support for more details`);
            SetPin(0)
            setShow(false)
            setLoading(false);
          } else{
            EnableToast(true)
            setTitle("Warning");
            setChance(chance-1)
            setEtype("Warning")
            setMsg(`You have ${chance} chance left to enter your correct pin before your account is locked for 3 hours. if you have forgotten your PIN? Kindly reset your PIN`);
            SetPin(0)
            setShow(false)
            setLoading(false);
          }
        }
      })
     
      });
   }
  },[Pin])
  useEffect(()=>{
    
      setShow(false);
      setLoading(false)
    
  },[Transaction_done])
  return (
    <View>
    {Show?(

  <View style={{flex: 1,
    backgroundColor:"rgba(0,0,0,0.5)"
  }}>
  <Modal
  animationType="slide"
  transparent={true}
  visible={Show}
  onRequestClose={() => {
    Alert.alert('Modal has been closed.');
    setModalVisible(!modalVisible);
  }}>
    
  <View style={styles.centeredView}>
 <View style={{alignSelf:"center",top:100}}>
  <LoadingScreen Show={false}/>
 
 </View>
 <View  style={styles.modalView}>
 <Pressable style={{backgroundColor:colors.swhite,borderRadius:100,width:65,height:10,alignSelf:"center",top:-15}}>
  </Pressable>
   <TouchableOpacity
    onPress={()=>setShow(false)}
    style={{
                  top:-35,
                  backgroundColor:colors.line,
                  width:33,
                  height:33,
                  borderRadius:100,
                  alignItems:"center",
                  justifyContent:"center",
                  alignSelf:"flex-end",
                  left:0
                  }}>
              <Image source={emages.Cancel} 
              style={{width:10,height:10}}/>
   
                  </TouchableOpacity>
    <ScrollView>
       
              <View style={{top:-30}}>
              <Pinview setInput={SetPin} viewName="Transaction Pin"/>
              <LoadingScreen Show={Loading} noLogo={false} />
              
              </View>
          
    </ScrollView>
  
 </View>
 </View>
 
</Modal>


</View>

    ):([])}
  
      

  </View>
    
  
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"rgba(0,0,0,0.1)"
  },

  modalView: {
    
    backgroundColor: 'white',
    borderRadius:0,
    padding: 35,
   
    height: "75%",
   
  
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

export default Tpins