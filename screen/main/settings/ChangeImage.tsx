import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, ActivityIndicator,KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts,LoadingScreen } from '../../../utility';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons,Feather ,AntDesign} from '@expo/vector-icons';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import { Acc_details, Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import * as Haptics from 'expo-haptics';
import { ToastContext } from '../../../context/AlertContext';
import * as ImagePicker from 'expo-image-picker';

const ProfilePicture = () => {
  const  navigation=useNavigation();
  const route=useRoute();
  const {pic}=route.params as any;
  const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 
  const {refresh,setRefresh}=useContext(StateRefresh);

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
  const [image, setImage] = useState<any>(null);
    const [imageFile, setImageFile] = useState<any>(null);
  const [Loading,setLoads]= useState(false);
  const [password, setPwd] = useState("");
 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3],
      quality:1
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageFile(pickImage)
      //Real_image.current=result as any;
      console.log(image);
    }
    
  };
   
  let name1 =username.charAt(0).toUpperCase();
  let name2 =username.charAt(1).toUpperCase();
   
   const Change_pic =()=>{
    setLoads(true);
         StorageGet("@app_login_code")
             .then((db)=>{
                 //console.log(db)
                 //setamt("loading.....");
                 const fileName = image.split('/').pop();
                 const fileType = fileName.split('.').pop();
                 const formData = new FormData();
                 const Imags=imageFile;
                 formData.append('profilepic', {
                   uri: image,
                   type:fileType,
                   name:fileName,
                 } as any);

                 formData.append('appcode',db as any);
                 formData.append('type','image')
                 Acc_details(formData).then((req)=>{
                    if(req?.data.status==true){
                     
                      setLoads(false);
  
                      EnableToast(true);
                      setEtype("Success");
                      setTitle("Successful!");
                      setMsg(`${req?.data.msg}`);
                      setRefresh(refresh+1)
                      console.log(req?.data)
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








  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    
    <StatusBar/>
    <TopBar Title="Change Profile Picture" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
    <SafeAreaView>

    <ScrollView>
    <Space height={5}/>
    <View style={{backgroundColor:colors.lightgrey,justifyContent:"center",alignItems:"center",width:"100%",height:400,borderRadius:0,alignSelf:"center"}}>
    <Image 
                 
                 source={{
                  uri: image != null ? (image): `${pic}`,
                }}
                style={{width:"100%",height:400,borderRadius:0}}
                />
    </View>
    
                    <Space height={10}/>
                   <Pressable 
                   
                    style={{backgroundColor:colors.lightgrey,justifyContent:"center",alignItems:"center",alignSelf:"center",width:"100%",height:200,flexDirection:"column",}}>
                    
                  
                    {/* <Ionicons name="ios-add-circle-outline" size={24} color="grey" /> */}
                    <Button 
                    onPress={pickImage}
                    icon="plus" mode='outlined' 
                    disabled={Loading}
                    style={{width:"90%",top:-30,borderRadius:5}}
                    >
                        Choose new Image
                    </Button>
                    <Space height={0}/>
                   <Button 
                    onPress={()=>Change_pic()}
                    mode='contained'
                    disabled={image!=null?(Loading):(true)}
                    style={{width:"90%",top:0,borderRadius:5}}
                    loading={Loading}
                    >
                     Update Changes 
                    </Button>
             </Pressable>
    <Space height={250}/>

   
    </ScrollView>
                    
   
    </SafeAreaView>
    </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}
 
export default ProfilePicture