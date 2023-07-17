import { View, Text,Image, TouchableOpacity,ImageBackground ,Pressable} from 'react-native'
import React from 'react'
import {colors,emages} from './index'

interface ServiceCardProp{
    url:any,
    text:any,
}
const ServiceCard:React.FC<ServiceCardProp> = ({url,text}) => {
  return (
    <View>
        <Pressable style={{flexDirection:"column"}}>
          <View style={{backgroundColor:colors.lightgrey,
          width:150,
          borderRadius:100,
          height:40,
          alignItems:"center",
         
       
            flexDirection:"row",
            justifyContent:"space-around",
              
        }}>
        
        <Image source={url} style={{
          width:25,
          height:25,
          
          }}/>
           <Text style={{fontFamily:'Poppins-Medium',fontSize:12,}}>{text}</Text>
        </View>
       
     
        </Pressable>
    </View>
  )
}

export default ServiceCard