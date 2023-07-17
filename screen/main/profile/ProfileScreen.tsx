import { View, Text,SafeAreaView,ScrollView,ImageBackground,Image, TouchableOpacity, NativeModules,Pressable } from 'react-native'
import React, { useContext,useEffect,useState  } from 'react'
import { Space, colors, emages,StatusBars, ServiceCard, BalanceCard,Banners, ProfileCard, ListCard } from '../../../utility/index'
import { Avatar, Card} from 'react-native-paper';
import {  SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import UserCard from '../../../utility/UserCard';
import {Slash} from '../../../utility/index';
import { StorageGet,StorageRemove} from '../../../service/storage';
import { LoginContext } from '../../../context/LoginContext';
import { Ionicons,MaterialIcons,AntDesign } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation=useNavigation() as any;
  const {Login,setLogin}=useContext(LoginContext);
  const [fullname,setfullname]= useState("");
  const [resel,setReseller]= useState(false);
  
  const Logout=async() => {
    StorageRemove().then((check)=>{
      //NativeModules.DevSettings.reload();
      setLogin(false);
    });
    

    useEffect(()=>{
      StorageGet("@app_user_details").then((db)=>{
        let get=JSON.parse(db);
       setfullname(get.fullname);
       //setReseller(get.reseller);
       //setPhone(get.phone)
       //setUsername(get.username);
        });
     },[]);


}
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
    <StatusBars backgroundColors={colors.lightgrey}/>
    <SafeAreaView>
   <ScrollView>

      <Space height={20}/>
          <View style={{alignItems:"center"}}>
          <ProfileCard />
        
         <Space height={50}/>
                  <Pressable 
                  onPress={()=>{
                   navigation.navigate('Settings')
                  }}
                  style={{backgroundColor:colors.white,width:"90%",height:60,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                  <Ionicons name="settings" size={20} color={colors.primary} style={{left:18}}/>
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:16,
                  left:25}}>Settings</Text>
                 
                  </Pressable>
                  <Space height={15}/>
                   <Pressable 
                   onPress={()=>{
                    navigation.navigate('HeaderWeb',{
                      header:"FAQ",
                      url:"https://premierswapng.com/about"
                    });
                   }}
                   style={{backgroundColor:colors.white,width:"90%",height:60,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                  <MaterialIcons name="messenger" size={20} color={colors.primary} style={{left:18}}/>
                  
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:16,
                  left:25}}>FAQs</Text>
                 
                  </Pressable>
                

                  <Space height={15}/>
                  <Pressable 
                   //onPress={()=>Logout()}
                   style={{backgroundColor:colors.white,width:"90%",height:60,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                 <Switch value={true} style={{left:18}} disabled={true}/> 
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:16,
                  left:25}}>Disable Push Notication</Text>

                  
                 
                  </Pressable>
                  <Space height={15}/>
                   <Pressable 
                    onPress={()=>{
                      navigation.navigate('HeaderWeb',{
                        header:"Contact Us To Close Your Account",
                        url:"https://premierswapng.com/contact"
                      });
                     }}
                   style={{backgroundColor:colors.white,width:"90%",height:60,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                   <AntDesign name="customerservice" size={20} color={colors.primary} style={{left:18}}/>
                  
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:16,
                  left:25}}>Close Account</Text>
                 
                  </Pressable>
                  <Space height={15}/>
                   <Pressable 
                   onPress={()=>Logout()}
                   style={{backgroundColor:colors.white,width:"90%",height:60,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                  <AntDesign name="logout" size={20} color={colors.primary} style={{left:18}}/>
                  
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:16,
                  left:25}}>Logout</Text>

                  
                 
                  </Pressable>
          </View>   
        
        
       
         <Space height={300}/>
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>

  )
}

export default ProfileScreen