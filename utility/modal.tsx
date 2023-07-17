import { View, Text } from 'react-native'
import React from 'react'
interface modals{
    Status:boolean
}
const Modal: React.FC<modals> = ({Status}) => {
  return (
    <View>
      <Text>M</Text>
    </View>
  )
}

export default Modal