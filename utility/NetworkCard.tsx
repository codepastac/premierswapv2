import { View, Text,Image,TouchableOpacity,TouchableHighlight,Pressable } from 'react-native'
import React from 'react'
import {colors, emages,LoadingScreen} from './index'
import { MaterialCommunityIcons } from '@expo/vector-icons';
 interface NetworkCardProps{
    IconSrc:any,
    onClick():void,
    active:boolean
 }
const NetworkCard:React.FC<NetworkCardProps> = ({IconSrc,onClick,active}) => {
 
  return (
    <View>
    <Pressable
    onPress={onClick}
    style={{
        backgroundColor:colors.white,
        borderColor:active?(colors.primary):(colors.line),
        borderWidth:2,
       width:55,
       borderRadius:5,
       alignItems:"center",
      height:55,
      justifyContent:"center"
    }}>
        <MaterialCommunityIcons 
        name="checkbox-multiple-marked-circle" 
        size={20} 
        color={active?(colors.primary):(colors.line)} 
        style={{top:-12,left:27}}
        />
        <Image source={IconSrc}
        style={{  width: '55%',
        height: undefined,
        aspectRatio: 1,
        top:-10,
        
          }}
        />
    </Pressable>
    </View>
  )
}

export default NetworkCard