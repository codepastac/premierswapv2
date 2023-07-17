import { View, Text,} from 'react-native'
import React from 'react'
import {emages} from './index';
import { Button } from 'react-native-paper';
interface Buttons{
 Text: any,
 Btncolor: any,
 Icon: any,
 onPress(): void,
 radius: number,
 height: number,
 loading:boolean,
 disabled:boolean
}
const Btn: React.FC<Buttons> = ({Text,Btncolor,Icon,onPress,radius,height,loading,disabled}) => {
  return (
    <Button loading={loading} disabled={disabled} icon={Icon} style={{marginRight:10,borderRadius:radius,height:height,justifyContent:"center",}} buttonColor={Btncolor} mode="contained" onPress={onPress}>
    {Text}
  </Button>
  )
}

export default Btn;