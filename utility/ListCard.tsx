import { View, Text,Image } from 'react-native'
import React from 'react'
import { Card,Chip } from 'react-native-paper'
import{colors,emages} from './index'
interface ListProps{
  icon:any,
  text:string,

}
const ListCard:React.FC<ListProps> = ({icon,text}) => {
  return (
    <View>
      <View style={{alignItems:"center",justifyContent:"center"}}>
      
      <Card style={{
        borderRadius:10,
        marginTop:0,
        top:-100,
        height:72,
        width:"93%",
        backgroundColor:colors.white,
        shadowColor: '#FFF',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.8,
       shadowRadius: 1,
      elevation: 5,
     
     
        }}
        mode="contained"
        >
         <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
         
         <View style={{
              backgroundColor:colors.lightgrey,
              borderRadius:100,
              alignItems:"center",
              justifyContent:"center",
              width:50,height:50,
              left:0,top:15,

             }}>
          <Image source={icon} style={{}}/>
       </View>
         <Text style={{fontFamily:"Poppins-Medium",top:14,left:-15}}>{text}</Text>
         <Image source={emages.Right} style={{top:15,tintColor:colors.grey}}/>
         </View>
        </Card>
    </View>
    </View>
  )
}

export default ListCard