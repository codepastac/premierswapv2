import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts,LoadingScreen } from '../../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons,Feather } from '@expo/vector-icons';
import { TextInput,ActivityIndicator } from 'react-native-paper';
import { Acc_details, Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';

const StatisticScreen = () => {
  const  navigation=useNavigation();
  const {refresh,setRefresh}=useContext(StateRefresh);
  const [fullname,setfullname]= useState("");
  const [resel,setReseller]= useState(false);
  const [phone,setPhone]= useState(0);
  const Fname=fullname.charAt(0).toUpperCase() + fullname.slice(1)
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [bvn,setBvn]= useState("");
  const [opwd,setOpwd]= useState("");
  const [npwd,setNpwd]= useState("");
  const [pwd,setpwd]= useState("");
  const [Tpin,setTpin]= useState("");
  const [Etype, setEtype] = useState("");
  const [Loading,setLoads]= useState(false);
  const [Onload,setload]= useState(false);
  const [password, setPwd] = useState("");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [rfno, setR] = useState("");

  const [cm, setCm] = useState("");

  const [bonus, setB] = useState("");

    const [error,setError]=useState(false);
    const copyToClipboard = async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      await Clipboard.setStringAsync(`https://premierswapng.com/share/${username}`);
      setLoads(false);
                setError(true);
                setEtype("Success")
                setTitle("Copied!");
                setMsg(`Your referral link was copied successful.`);
    };
    useEffect(()=>{
      StorageGet("@app_user_details").then((db)=>{
        let get=JSON.parse(db);
       setfullname(get.fullname);
       setReseller(get.reseller);
       setPhone(get.phone)
       setUsername(get.username);
        });
     },[]);
     const RefferalLog =()=>{
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      setLoads(true);
           StorageGet("@app_login_code")
               .then((db)=>{
                   console.log(db)
                   //setamt("loading.....");
                   let payload=JSON.stringify({
                       appcode:db,
                       type:"refer",
                       //tp:"pwd",
    
                      
                   });
                   Acc_details(payload).then((req)=>{
                     setB(req?.data.bonus);
                     setCm(req?.data.earned)
                     setR(req?.data.rf)
                     //if(req?.data.rf)
                     setLoads(false)
                   }).catch((e)=>{
                    console.log(e)
                   })
                  });
     }
    useEffect(()=>{
    RefferalLog();
    },[])
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    
    <StatusBar/>
    <TopBar Title="Referral Statistics" Back={false} onClick={()=>navigation.navigate('BottomNav')}/>
    <SafeAreaView>

    <ScrollView>
    <Space height={20}/>
    {Loading?([]):(<View>
      <Pressable 
                  onPress={
                   ()=>{
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      //navigation.navigate('AddBvn')
                    
                    }}
                  style={{backgroundColor:colors.white,width:"100%",height:80,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center",justifyContent:"space-evenly"}}>
                  
                  <View style={{flexDirection:"column",justifyContent:"center"}}>
                 <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:25}}>Total Referral Commission </Text>
                  <Space height={10}/>
                 <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:25}}>₦{`${cm}`}</Text>
                 </View>
                 <View style={{flexDirection:"column",justifyContent:"center",left:15}}>
                 <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:25}}>No of Referrals</Text>
                  <Space height={10}/>
                 <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:25}}>{`${rfno}`}</Text>
                 </View>
                  <View style={{flex:1,alignItems:"flex-end",left:-15}}>
                  <Pressable 
                  onPress={()=>{
                    RefferalLog()
                  }}
                  style={{backgroundColor:colors.line,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
                 
                  <Feather name="refresh-ccw" size={18} color={colors.primary} />
                 </Pressable> 
                  </View>
                  </Pressable>
                  <Space height={30}/>
                  <Pressable 
                  onPress={
                   ()=>{
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      //navigation.navigate('AddBvn')
                    
                    }}
                  style={{backgroundColor:"#00bcd4",width:"95%",height:80,borderRadius:5,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                  
                 <View style={{flexDirection:"column",justifyContent:"center",width:"80%",alignItems:"center",height:100}}>
               <Space height={5}/>
                 <Text style={{color:colors.white,
                  fontFamily:"DMSans-Medium",
                  fontSize:12,
                  left:25}}>Refer Friends and get ₦{`${bonus}`} when they register using your referral link and upgrade to reseller
                  Fake/Invalid referrals would not be counted</Text>
                  <Space height={10}/>
                
                 </View>
                  
                  </Pressable>
              <Space height={30}/>
                    <View style={{width:"100%", height:400,backgroundColor:colors.white,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:-10,textAlign:"center"}}>Share your link or scan QR Code</Text>
                   {Onload?(<ActivityIndicator style={{alignSelf:"center"}}/>):([])}
                   <Image 
                    onLoadStart={()=>setload(true)}
                    //progressiveRenderingEnabled={true}
                   onLoad={()=>setload(false)}
                   onLoadEnd={()=>setload(false)}
                   source={{
                    uri: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://premierswapng.com/share/${username}&choe=UTF-8`,
                  }}
                  style={{height:300,width:"70%"}}
                  />
                   <View style={{flexDirection:"column",width:"85%",alignSelf:"center",justifyContent:"space-evenly"}}>
                           <Pressable 
                           onPress={copyToClipboard}
                           style={{flexDirection:"row",justifyContent:"space-between",alignSelf:"center",backgroundColor:colors.swhite,borderRadius:100,padding:5}}>
                             
                               <Text
                                style={{ fontFamily:"Poppins-Bold",fontSize:12}}
                                >Copy refferal link: @{`${username}`}  <Feather name="copy" size={15} color={colors.grey} /></Text>
                                
                                
                             </Pressable>
                    </View>
                    </View>
             
    </View>)}
   <Space height={300}/>
    </ScrollView>
   
    <LoadingScreen Show={Loading} noLogo={true}/>

    </SafeAreaView>
    </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

export default StatisticScreen