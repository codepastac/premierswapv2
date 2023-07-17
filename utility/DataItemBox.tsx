import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {colors, emages} from './index'
import { MaterialCommunityIcons } from '@expo/vector-icons';
 interface NetworkCardProps{
    onClick():void,
    price:string,
    label:any
 }
const DataItemBox:React.FC<NetworkCardProps> = ({onClick,price,label}) => {
    const numberWithCommas = (x:any) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
  return (
    <TouchableOpacity 
    onPress={onClick}
    style={{
        backgroundColor:colors.line,
        
       width:80,
       borderRadius:10,
       alignItems:"center",
      height:90,
      top:-30,
      flexDirection:"column"
    }}>
      
      <Text style={{
        fontSize:14,
        fontFamily:"Poppins-SemiBold",
        top:10
      }}> {label }</Text>
       <View style={{backgroundColor:colors.white,position:"absolute",width:"100%",top:48,height:40,alignItems:"center",borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
       <Text style={{fontSize:12,fontFamily:"Poppins-Bold", color:colors.primary,top:15,}}>₦{price}</Text>
    
       </View>
       </TouchableOpacity>
  )
}

export default DataItemBox