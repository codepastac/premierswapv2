import { View, Text , ScrollView, TouchableOpacity, TouchableHighlight,Image,StyleSheet,Pressable } from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { colors,Pincode,Space,FontSize,emages,Pinview,LoadingScreen,Btn} from '../../../utility/index'
import * as Haptics from 'expo-haptics';
import { PinContext } from '../../../context/PinContext';
import { useNavigation } from '@react-navigation/native';
import {Alerts} from '../../../utility/index'
import { Button, Snackbar } from 'react-native-paper';
import { RegisterAuth } from '../service/index';
import { RegisterContext } from '../../../context/RegisterContext';
import { SafeAreaView } from 'react-native-safe-area-context';
const Confirm_passcode = () => {
  const {firstname,secondname,setFN,setSN,username,setuser,email,setEmail,telephone,setTelephone,pwd}=useContext(RegisterContext);
  
  const Navigation= useNavigation();
  const{passcode,cpasscode,setcPasscode}=useContext(PinContext);
  const [Loading,setLoading]=useState(false);
  const [disabled, setDisable] = useState(false);
  const [error,setError]=useState(false);
  const Continue =()=>{
    if (cpasscode.toString().length == 4){
      if ( passcode === cpasscode ) {
     
      Register();
      } else {
        setError(true);
       

      }
    }
  }
  const close=()=>{
    setError(false);
  }
  const Register = async()=>{
    setLoading(true);
    setDisable(true)
    let payload=JSON.stringify({
      firstname:firstname,
      lastname:secondname,
      username:username,
      email:email,
      phone:telephone,
      password:pwd,
      passcode:passcode,
      type:"register"
   });
    RegisterAuth(payload)
    .then((req)=>{
      //console.log(req?.data);
      if ( req?.data.error == false) {
        setDisable(false);
      setLoading(false)
      //alert("success");
      console.log(req?.data);
      console.log(payload);
      setDisable(false)
      Navigation.navigate('Account_created');
      } else {
        setDisable(false);
      setLoading(false)
      console.log(req?.data);
      setDisable(false)
      }
        //alert(req.data.msg);
    });

    //console.log(passcode+pwd);

  }
  useEffect(()=>{
  setTimeout(() => {
    setLoading(false);
  }, 20000);
  })
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
      
    <Pinview setInput={setcPasscode} viewName="Confirm Pin"/>
    <Space height={40}/>
                  <Btn
                  Text="Continue" Btncolor={colors.primary} 
                  onPress={()=>Continue()}
                
                  
                  radius={100}
                  height={55}
                  disabled={cpasscode=="nullnullnullnull"?(true):(disabled)}
                  />
     </ScrollView>
     </View>
     <Space height={0}/>
    
    <Alerts
      Show={error}
      Type='Error' 
      Label='Ok try again'
       EText='Passcode not match'
      Content='The passcode you entered does not match'
      onClick={()=>close()}
     />
     <LoadingScreen Show={Loading}/>
    </SafeAreaView>
  )
}

export default Confirm_passcode