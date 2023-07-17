import { View, Text } from 'react-native'
import React from 'react'
interface spaces{
  height :number
}
const Space: React.FC<spaces> = ({height}) => {
  return (
   
     <View style={{marginTop:height,}}/>
    
  )
}

export default Space