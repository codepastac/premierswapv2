import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {colors, emages} from './index'
import { MaterialCommunityIcons } from '@expo/vector-icons';
 interface NetworkCardProps{
    onClick():void,
    reward:string,
    label:number
 }
const ServiceAmt:React.FC<NetworkCardProps> = ({onClick,reward,label}) => {
  return (
    <TouchableOpacity 
    onPress={onClick}
    style={{
        backgroundColor:colors.white,
        borderColor:(colors.line),
        borderWidth:2,
       width:100,
       borderRadius:5,
       alignItems:"center",
      height:40,
      justifyContent:"center"
    }}>
       
      <Text style={{
        fontSize:18,
        fontFamily:"Poppins-Medium",
        
      }}> ₦{label.toLocaleString()}</Text>
       
    </TouchableOpacity>
  )
}

export default ServiceAmt