import { View, Text,Image, Pressable } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { Card,Chip } from 'react-native-paper'
import{Space, colors,emages} from './index'
import { StorageGet } from '../service/storage'
import { AntDesign,MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Acc_details } from '../screen/service'
import { StateRefresh } from '../context/StateRefresh'
const ProfileCard = () => {
  const navigation = useNavigation() as any;
  const {refresh,setRefresh}=useContext(StateRefresh);

  const [fullname,setfullname]= useState("");
  const [resel,setReseller]= useState(false);
  const [phone,setPhone]= useState(0);
  const Fname=fullname.charAt(0).toUpperCase() + fullname.slice(1)
  const [username,setUsername]= useState("");
  let name1 =username.charAt(0).toUpperCase();
  let name2 =username.charAt(1).toUpperCase();
  const [pic,setpic]= useState("");

   useEffect(()=>{
    StorageGet("@app_user_details").then((db)=>{
      let get=JSON.parse(db);
     setfullname(get.fullname);
     setReseller(get.reseller);
     setPhone(get.phone)
     setUsername(get.username);
      });
   },[]);
   useEffect(()=>{
      
    StorageGet("@app_login_code")
    .then((db)=>{
        console.log(db)
        let payload=JSON.stringify({
            appcode:db,
            type:"verify"
        });
        console.log(payload);
        Acc_details(payload).then((req)=>{
          //setAcct(req?.data.acct);
         // setBvn(req?.data.bvn);
          setpic(req?.data.pic)
          console.log(pic)
        });
      }).catch((e)=>{
        console.log(e);
      })
  
},[refresh])
  return (
   <View>
            <Pressable
            onPress={()=>{
              navigation.navigate('ProfilePic',{
                pic:`https://premierswapng.com/uploads/${pic}`
              })
            }}
             style={{backgroundColor:"#CDCCFF",borderRadius:100,alignItems:"center",justifyContent:"center",width:100,height:100,alignSelf:"center"}}>
                  <Image 
                 
                   source={{
                    uri: `https://premierswapng.com/uploads/${pic}`,
                  }}
                  style={{height:"100%",width:"100%",borderRadius:100}}
                  />
            <Pressable
            onPress={()=>{
              navigation.navigate('ProfilePic',{
                pic:`https://premierswapng.com/uploads/${pic}`
              })
            }}
            style={{position:"absolute",bottom:0,right:5,backgroundColor:colors.lightgrey,padding:5,borderRadius:100}}>
            <AntDesign name="pluscircle" size={20} color={colors.primary} />
            
            </Pressable>
            </Pressable>
                 <Space height={15}/>
                 
                 <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:18,
               
                  
                  }}>{fullname} </Text>
                  
                  {resel?(
                 <View style={{flexDirection:"row",alignSelf:"center"}}>
                 <Text style={{fontFamily:"DMSans-Medium",color:colors.secondary,fontSize:13}}>
                   Reseller 
                 </Text>
                 <MaterialIcons name="verified" size={10} color={colors.primary} style={{left:0,top:3}}/>
                 
                 </View>
                  ):([])}
                  
               <Space height={10}/>
              
                  <Pressable style={{backgroundColor:colors.primaryLight,padding:10,justifyContent:"center",alignItems:"center",borderRadius:100}}>
                  <Text style={{color:colors.primary,
                  fontFamily:"DMSans-Bold",
                  fontSize:14,

               
                  
                  }}>@{username}</Text>
                  </Pressable>
                  
   </View>
  )
}

export default ProfileCard