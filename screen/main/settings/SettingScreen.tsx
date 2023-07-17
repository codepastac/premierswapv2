import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, ActivityIndicator,KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts,LoadingScreen } from '../../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons,Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Acc_details, Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import * as Haptics from 'expo-haptics';
import { ToastContext } from '../../../context/AlertContext';

const SettingScreen = () => {
  const  navigation=useNavigation();
  const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 

  const [fullname,setfullname]= useState("");
  const [resel,setReseller]= useState(false);
  const [phone,setPhone]= useState(0);
  const Fname=fullname.charAt(0).toUpperCase() + fullname.slice(1)
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [bvn,setBvn]= useState("null");
  const [opwd,setOpwd]= useState("");
  const [npwd,setNpwd]= useState("");
  const [pwd,setpwd]= useState("");
  const [Tpin,setTpin]= useState("");
 
  const [Loading,setLoads]= useState(false);
  const [password, setPwd] = useState("");
 
  
    const [error,setError]=useState(false);
    
 const Change_Password =()=>{
  setLoads(true);
       StorageGet("@app_login_code")
           .then((db)=>{
               console.log(db)
               //setamt("loading.....");
               let payload=JSON.stringify({
                   appcode:db,
                   old_pass:opwd,
                   new_pass:npwd,
                   type:"change",
                   tp:"pwd",

                  
               });
               Acc_details(payload).then((req)=>{
                  if(req?.data.status==true){
                   
                    setLoads(false);

                    EnableToast(true);
                    setEtype("Success");
                    setTitle("Successful!");
                    setMsg(`${req?.data.msg}`);
                  } else {
                    setLoads(false);
                    EnableToast(true);
                    setEtype("Error");
                    setTitle("Error Info");
                    setMsg(`${req?.data.msg}`);
                  console.log(req?.data)
                  }
               }).catch((e)=>{
                console.log(e)
               })
              });
 }

 const Change_Pin =()=>{
  setLoads(true);
       StorageGet("@app_login_code")
           .then((db)=>{
               console.log(db)
               //setamt("loading.....");
               let payload=JSON.stringify({
                   appcode:db,
                   old_pass:pwd,
                   new_pin:Tpin,
                   type:"change",
                   //tp:"",

                  
               });
               Acc_details(payload).then((req)=>{
                  if(req?.data.status==true){
                   
                    setLoads(false);

                    EnableToast(true);
                    setEtype("Success");
                    setTitle("Successful!");
                    setMsg(`${req?.data.msg}`);
                  } else {
                    setLoads(false);
                 EnableToast(true);
                    setEtype("Error");
                    setTitle("Error Info");
                    setMsg(`${req?.data.msg}`);
                  console.log(req?.data)
                  }
               }).catch((e)=>{
                console.log(e)
               })
              });
 }
  let name1 =username.charAt(0).toUpperCase();
  let name2 =username.charAt(1).toUpperCase();
   useEffect(()=>{
    StorageGet("@app_user_details").then((db)=>{
      let get=JSON.parse(db);
     setfullname(get.fullname);
     setReseller(get.reseller);
     setPhone(get.phone)
     if(get.bvn!=null){
      setBvn(get.bvn)
     }       
     setEmail(get.email)
     setUsername(get.username);
      });
   },[]);
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    
    <StatusBar/>
    <TopBar Title="Settings" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
    <SafeAreaView>

    <ScrollView>
    <Space height={20}/>
     <View style={{width:"90%",alignSelf:"center"}}>
     <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:18,
                  left:15
                  
                  }}>Account Details</Text>
                  <Space height={20}/>
              <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label="FullName"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //secureTextEntry={Checksecure}
                value={Fname}
               // onChangeText={password=>setPwd(password)}
                //right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
                //disabled={true}
            />

        <Space height={50}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label="UserName"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //secureTextEntry={Checksecure}
                value={username}
               // onChangeText={password=>setPwd(password)}
                //right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
                //disabled={true}
            />

             <Space height={50}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label="Phone Number"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //secureTextEntry={Checksecure}
                value={`${phone}`}
               // onChangeText={password=>setPwd(password)}
                //right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
                //disabled={true}
            />

            <Space height={50}/>
             {bvn.length != 11?(<>
             
              <Pressable 
                  onPress={
                   ()=>{
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      navigation.navigate('AddBvn')
                    
                    }}
                  style={{backgroundColor:colors.swhite,width:"100%",height:80,borderRadius:10,flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                  <Image source={emages.Bvn} style={{width:40,height:40,left:15}}/>
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:25}}>Add BVN </Text>
                  <View style={{flex:1,alignItems:"flex-end",left:-15}}>
                  <View style={{backgroundColor:colors.line,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
                  <Feather name={"alert-triangle"} size={20} color={"red"} />
                
                 
                 </View> 
                  </View>
                  </Pressable>
             </>):(<>
              <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label="BVN"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //secureTextEntry={Checksecure}
                value={`${bvn.substring(0, 3)}********`}
               // onChangeText={password=>setPwd(password)}
                //right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
                //disabled={true}
            />
             
             </>)

             }
              <Space height={50}/>
               <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:18,
                  left:15
                  
                  }}>Change Password</Text>
              <Space height={50}/>
              <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'97%',alignSelf:"center"}}
                label="Old Password"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                secureTextEntry={true}
                value={opwd}
                onChangeText={opwd=>setOpwd(opwd)}
                //right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
                //disabled={true}
                placeholder='Enter your former password'
            />
             <Space height={40}/>
             <View style={{flexDirection:"row"}}>
             <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'80%',alignSelf:"center"}}
                label="New Password"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                secureTextEntry={true}
                value={npwd}
                onChangeText={npwd=>setNpwd(npwd)}
                //right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
                //disabled={true}
                placeholder='Enter a secure password'
            />
             <Space height={40}/>
            
             <View style={{left:5,top:2}}>
                         <Btn
                            Text="Go" 
                            Btncolor={colors.primary} 
                            radius={6}
                            height={55}
                            disabled={opwd.length==0?(true):(npwd.length==0?(true):false)}
                            //loading={Loading}
                            onPress={()=>Change_Password()}
                             />
                        </View>
                       
             </View>

             <Space height={50}/>
               <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:18,
                  left:15
                  
                  }}>Change Pin</Text>
              <Space height={50}/>
              <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'97%',alignSelf:"center"}}
                label="Password"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                secureTextEntry={true}
                value={pwd}
                onChangeText={pwd=>setpwd(pwd)}
                placeholder='Enter your password'
            />
             <Space height={40}/>
             <View style={{flexDirection:"row"}}>
             <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'80%',alignSelf:"center"}}
                label="Enter New Pin"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //secureTextEntry={true}
                value={Tpin}
                onChangeText={Tpin=>setTpin(Tpin.replace(/[^0-9]/g, ''))}
                maxLength={4}
                keyboardType='number-pad'
                placeholder=''
            />
             <Space height={40}/>
            
             <View style={{left:5,top:2}}>
                         <Btn
                            Text="Go" 
                            Btncolor={colors.primary} 
                            radius={6}
                            height={55}
                            disabled={pwd.length==0?(true):(Tpin.length==0?(true):false)}
                            //loading={Loading}
                            onPress={()=>Change_Pin()}
                             />
                        </View>
                       
             </View>



    <Space height={250}/>

    </View>
    </ScrollView>
                    
                     <LoadingScreen Show={Loading} noLogo={true}/>
    </SafeAreaView>
    </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}
 
export default SettingScreen