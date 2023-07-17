import { View, Text , ScrollView,SafeAreaView, TouchableOpacity, TouchableHighlight,Image,StyleSheet,Pressable } from 'react-native'
import React,{useEffect, useState} from 'react'
import { colors,Pincode,Space,FontSize,emages, Slash} from './index'
import {TouchableRipple } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

interface PinProps{
    setInput: any,
    viewName: string
}
const Pinview:React.FC<PinProps> = ({setInput,viewName}) => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    
    input:{
      width:80,borderRadius:100,height:50,backgroundColor:colors.white,
     alignItems:"center",
     justifyContent:"center",
    
    },
    zero:{
      width:80,borderRadius:100,height:30,backgroundColor:colors.white,
      alignItems:"center",
      justifyContent:"center",
     
    },
    go:{
      
    }
      });
  const [pin1,setpin1]=useState<any>(null);
  const [pin2,setpin2]=useState<any>(null);
  const [pin3,setpin3]=useState<any>(null);
  const [pin4,setpin4]=useState<any>(null);
  const [pin,setpin]=useState<any>(null);
  const Cancel = () =>{
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    if(pin4!=null){
      setpin4(null);
    } else if (pin3 != null) {
      setpin3(null);
    } else if (pin2 != null){
      setpin2(null);
    } else if (pin1 != null) {
      setpin1(null);
    }
  }
  function Tap(val){
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    if(pin1==null){
      setpin1(val);
    } else if (pin2 == null) {
      setpin2(val);
    } else if (pin3 == null){
      setpin3(val);
    } else if (pin4 == null) {
      setpin4(val);
     
    }
  }
 
 useEffect(()=>{
    setInput(`${pin1}${pin2}${pin3}${pin4}`);
 })

  return (
   
  
    <View>
    <Space height={40}/>
        <View style={{alignItems:"center"}}>
        <Image source={emages.icon} style={{width:50,height:50,tintColor:colors.primary}}/>
        </View>
        <Space height={20}/>
    <Text style={{fontFamily:"Poppins-Bold",fontSize:FontSize.normal,color:colors.secondary,textAlign:'center'}}>{viewName}</Text>
    <Space height={30}/>
     

   <View style={{alignSelf:"center",backgroundColor:colors.lightgrey,width:200,height:40,justifyContent:"center",borderRadius:100,}}>
        <Pincode 
            pin1={pin1}
            pin2={pin2}
            pin3={pin3} 
            pin4={pin4}
            />
   </View>

            
      {/* <Text>{pin1} {pin2} {pin3} {pin4}</Text> */}
      <Space height={40}/>
     <View style={{flexDirection:"row",width:"100%",backgroundColor:"white",justifyContent:"space-between"}}>
     <Pressable onPress={()=>Tap(1)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>1</Text>
       </Pressable>
     
       <Pressable onPress={()=>Tap(2)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>2</Text>
       </Pressable>
       <Pressable onPress={()=>Tap(3)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>3</Text>
       </Pressable>
     </View>


     <Space height={10}/>
       <Slash/>
       <Space height={10}/>
       <View style={{flexDirection:"row",width:"100%",backgroundColor:"white",justifyContent:"space-between"}}>
     <Pressable onPress={()=>Tap(4)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>4</Text>
       </Pressable>
     
       <Pressable onPress={()=>Tap(5)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>5</Text>
       </Pressable>
       <Pressable onPress={()=>Tap(6)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>6</Text>
       </Pressable>
     </View>


     <Slash/>
       <Space height={10}/>
       <View style={{flexDirection:"row",width:"100%",backgroundColor:"white",justifyContent:"space-between"}}>
     <Pressable onPress={()=>Tap(7)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>7</Text>
       </Pressable>
     
       <Pressable onPress={()=>Tap(8)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>8</Text>
       </Pressable>
       <Pressable onPress={()=>Tap(9)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>9</Text>
       </Pressable>
     </View>

     <Slash/>
       <Space height={10}/>
       <View style={{flexDirection:"row",width:"100%",backgroundColor:"white",justifyContent:"space-between"}}>
     <Pressable 
     onPress={()=>{
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
     }}
     style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
     <LottieView
        source={require("../assets/Animation/animation_lk2ygp3e.json")}
        style={{
          width: 60,
          height: 60,
        }}
        autoPlay
      />
        
       </Pressable>
     
       <Pressable onPress={()=>Tap(0)} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:18}}>0</Text>
       </Pressable>
       <Pressable onPress={Cancel} style={{backgroundColor:colors.white,width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:100}}>
        <Text style={{fontFamily:"Poppins-SemiBold",fontSize:14}}>Delete</Text>
       </Pressable>
     </View>
    </View>
    
  )
}

export default Pinview