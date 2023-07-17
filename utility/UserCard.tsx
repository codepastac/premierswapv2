import { View, Text,Image,Pressable } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons,Ionicons  } from '@expo/vector-icons';
import {emages,colors, Space} from './index';
import { IconButton, Tooltip,Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface UserProps{
    username : string,
    reseller: boolean,
    pic:any
}
const UserCard:React.FC<UserProps> = ({username,reseller,pic}) => {
  let name =username.charAt(0).toUpperCase() + username.slice(1);
  let name1 =username.charAt(0).toUpperCase();
  let name2 =username.charAt(1).toUpperCase();
  const navigation=useNavigation();
  return (
    <View>
     <View style={{flexDirection:"row",justifyContent:"flex-start",width:"100%",}}>
    
     <View style={{backgroundColor:colors.white,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,left:20}}>
              <Image 
                 
                 source={{
                  uri: `https://premierswapng.com/uploads/${pic}`,
                }}
                style={{height:"100%",width:"100%",borderRadius:100}}
                />
          </View>     
          <View style={{marginLeft:24,flexDirection:"column"}}>
          <Text style={{fontFamily:"DMSans-Medium",fontSize:18,color:colors.secondary,top:0}}>Hello, {name}
           
           </Text>
          {reseller?(
          <View>
              <View style={{flexDirection:"row"}}>
              <Text style={{fontFamily:"DMSans-Medium",color:colors.secondary,fontSize:13}}>
                Reseller 
              </Text>
              <MaterialIcons name="verified" size={10} color={colors.primary} style={{left:0,top:3}}/>
              
              </View>
               <Space height={20}/>
               </View>
            ):(
              <View>
              <Text style={{fontFamily:"DMSans-Medium",color:colors.secondary,fontSize:13,}}>
                Upgrade now to reseller!
               </Text>
               <Space height={20}/>
                </View>
             )}
             
        </View>
         
         
         <View style={{flex:1,alignItems:"flex-end",left:-15}}>
          <Pressable
           onPress={()=>{
            navigation.navigate('HeaderWeb',{
              header:"Send us a message",
              url:"https://premierswapng.com/contact"
            });
           }}
          style={{backgroundColor:colors.line,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
          <AntDesign name="customerservice"  size={22} color={colors.primary} />
          
          </Pressable>     
            </View>
          
        </View>
      <Space height={0}/>
     
    </View>
  )
}

export default UserCard