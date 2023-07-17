import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
interface TobBarProps{
    Title:string,
    Back : boolean,
    onClick(): void,
}
const TopBar:React.FC<TobBarProps> = ({Title,Back,onClick}) => {
    
  return (
    <View>
      <Appbar.Header style={{alignItems:"center"}}>
      {Back?(<Appbar.BackAction onPress={onClick} /> ) :([])}
      <Appbar.Content title={Title}/>
     </Appbar.Header>
    </View>
  )
}

export default TopBar