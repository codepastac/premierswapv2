import { View, Text,TextInput, StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import {colors} from './index';

interface PinProps{
pin1: any,
pin2: any,
pin3: any,
pin4: any,
}
const Pincode:React.FC<PinProps> = ({pin1,pin2,pin3,pin4}) => {
  const styles = StyleSheet.create({
    
    input:{
      width:13,borderRadius:100,height:13,backgroundColor:colors.primary,
      color:colors.primary
    },
    Opacity:{
    opacity:0.2,
    },
    empty:{

    }
  });
  
  return (
    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      
            <TextInput style={[styles.input, pin1===null?styles.Opacity : styles.empty]}
             //keyboardType="numb"
             maxLength={1}
             editable={false}
             placeholderTextColor={colors.primary}
             underlineColorAndroid={colors.primary}
             value={String(pin1)}
               />
            <TextInput style={[styles.input, pin2===null?styles.Opacity : styles.empty]}
            // keyboardType="number-pad"
             maxLength={1}
             editable={false}
             placeholderTextColor={colors.primary}
             underlineColorAndroid={colors.primary}
             value={String(pin2)}

               />
            <TextInput style={[styles.input, pin3===null?styles.Opacity : styles.empty]}
             //keyboardType="number-pad"
             maxLength={1}
             editable={false}
             placeholderTextColor={colors.primary}
             underlineColorAndroid={colors.primary}
             value={String(pin3)}
               />
            <TextInput style={[styles.input, pin4===null?styles.Opacity : styles.empty]}
             //keyboardType="number-pad"
             maxLength={1}
             placeholderTextColor={colors.primary}
             underlineColorAndroid={colors.primary}
             editable={false}
             value={String(pin4)}
               />
    </View>
  )
}
export default Pincode