import { View, Text,Image, TouchableOpacity,ImageBackground,Pressable } from 'react-native'
import React from 'react'
import {colors,emages} from './index'
interface ServiceCardProp2{
    url:any,
    text:string,
    content:string,
    onClick():void
}
const ServiceCard2:React.FC<ServiceCardProp2> = ({url,text,content,onClick}) => {
  return (
    <View>
        <Pressable
        onPress={onClick}
        style={{flexDirection:"column"}}>
          <View style={{
        backgroundColor:colors.white,
        width:160,
        borderRadius:10,
        height:170,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        flexDirection:"column",
       
        
        }}>
         <ImageBackground
         source={emages.Bg3} style={{flex:1,height:70,  borderBottomRightRadius:10}}>
  <Image source={url} style={{
            width:25,
            height:25,
            left:10,
            top:20,
          
            }}/>
         </ImageBackground>
         <View style={{left:10,top:-50}}>

     <Text style={{fontFamily:'Poppins-Medium',fontSize:16,top:10}}>{text}</Text>
         <View style={{width:"92%",top:20}}>
         <Text style={{fontFamily:'Poppins-Regular',fontSize:12,}}>
            {content}
          </Text>
         </View>
        
          </View>
        
        
          </View>
          
     
        </Pressable>
    </View>
  )
}

export default ServiceCard2