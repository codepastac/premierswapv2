//import liraries
import { View, Text,SafeAreaView, ScrollView,Pressable,Image} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { colors,HisTable,Space,TopBar ,emages,NetworkCard,Btn,Alerts,LoadingScreen} from '../../../utility';
import {  SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Avatar, Card} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { StatusBar } from 'expo-status-bar';
import { StorageGet, StorageUpdate } from '../../../service/storage';
import { Acc_details, FetchBalance, Upgrade } from '../../service';
//import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { MaterialIcons,MaterialCommunityIcons,AntDesign,Ionicons,Entypo,Feather } from '@expo/vector-icons';
import { StateRefresh } from '../../../context/StateRefresh';
import { ToastContext } from '../../../context/AlertContext';

// create a component
const AddBvn = () => {
    const  navigation=useNavigation() as any;
    const {refresh,setRefresh}=useContext(StateRefresh);
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 

    const [His1,setHis1]= useState(true);
    const [His2,setHis2]= useState(false);
    const [Loading,setLoads]= useState(false);
    const [Loadings,setLoadss]= useState(false);
    const [bvn,setBvn]= useState("");
   
    const [email, setUsername] = useState("");
    const [password, setPwd] = useState("");
   
    const [amt, setamt] = useState("0");
    const [acct,setAcct]= useState(false);
      const [bvns,setBvns]= useState(false);
    const [error,setError]=useState(false);
    
    const [resel,setReseller]= useState(false);
    const SubmitResel=()=>{
      setLoads(true);
       StorageGet("@app_login_code")
           .then((db)=>{
               console.log(db)
               //setamt("loading.....");
               let payload=JSON.stringify({
                   appcode:db,
                   type:"upgrade",
                   type2:"upgrade",

                  
               });
               Upgrade(payload).then((req)=>{
                  if(req?.data.status==true){
                    StorageGet("@app_user_details").then((db)=>{
                      let get=JSON.parse(db);
                      let user_details= JSON.stringify({
                        username :get.username,
                        reseller :1,
                        fullname:get.fullname,
                        phone:get.phone,
                      });
                    StorageUpdate("@app_user_details",user_details).then((data)=>{
                      if(data){
                        setLoads(false);
                        setRefresh(refresh+1)
                        EnableToast(true);
                        setEtype("Success");
                        setTitle("Successful!");
                        setMsg(`${req?.data.msg}`);
                            console.log(req?.data)
                          } else {
                            setLoads(false);

                            EnableToast(true);
                            setEtype("Error");
                            setTitle("Error Info");
                            setMsg(`${req?.data.msg}`);
                          console.log(req?.data)
                          }
                    })
                  });
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
    
    const SubmitBVN=()=>{
        setLoads(true);
        StorageGet("@app_login_code")
      .then((db)=>{

          console.log(db)
          let payload=JSON.stringify({
            appcode:db,
            type:"bvn",
            bvn:bvn

        });
       
          console.log(payload);
          Upgrade(payload).then((req)=>{
            
                if(req?.data.status==true){
                    //success
                    setLoads(false);

                      setRefresh(refresh+1)
                        EnableToast(true);
                        setEtype("Success");
                        setTitle("Successful!");
                        setMsg(`${req?.data.msg}`);
                        setMsg(`${req?.data.msg}`);
                        //console.log(user_details)
                    
                    
                  
                  

                } else {
                  setLoads(false);

                  EnableToast(true);
                  setEtype("Error");
                  setTitle("Error Info");
                  setMsg(`${req?.data.msg}`);
                }

                })


            });
            }

            useEffect(()=>{
      
              if( amt=="0"){
                 StorageGet("@app_login_code")
           .then((db)=>{
               console.log(db)
               setamt("loading.....");
               let payload=JSON.stringify({
                   appcode:db,
                   type:"price",
                   type2:"price",

                  
               });
               Upgrade(payload).then((req)=>{
                  if(req?.data.status==true){
                    setamt(`${req?.data.price}`);
                   
                    console.log(req?.data.price)
                    
                  } else {
                 setLoads(false);
                 EnableToast(true);
                    setEtype("Error");
                    setTitle("Error Info");
                    setMsg(`${req?.data.msg}`);
                  }
               })
              });
              }
     
            },[])
            useEffect(()=>{
              setLoadss(true)
              StorageGet("@app_user_details").then((db)=>{
                let get=JSON.parse(db);
              //setUsername(get.username);
              setReseller(get.reseller);
              
                });
              StorageGet("@app_login_code")
              .then((db)=>{
                  console.log(db)
                  let payload=JSON.stringify({
                      appcode:db,
                      type:"verify"
                  });
                  console.log(payload);
                  Acc_details(payload).then((req)=>{
                    setAcct(req?.data.acct);
                    setBvns(req?.data.bvn);
                    console.log(req?.data)
                    setLoadss(false)
                  });
                }).catch((e)=>{
                  console.log(e);
                  setLoads(false)
                })
            
          },[refresh])
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
      <StatusBar/>
     <TopBar Title="Complete verification" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
      <SafeAreaView>
        
      <ScrollView>
      {Loadings?([]):(
        <View>
          <View style={{backgroundColor:colors.white,width:"110%",height:80,borderRadius:10,left:-20,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                  
                  <Pressable onPress={()=>{
                    setHis1(true)
                    setHis2(false)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }}>
                  <Text style={{color:His1?(colors.primary):(colors.grey),
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
               
                  
                  }}>Add BVN</Text>
                  </Pressable>
                  <Pressable onPress={()=>{
                    setHis1(false)
                    setHis2(true)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }}
                  style={{flexDirection:"row",alignItems:"center"}}
                  >
                  <Text style={{color:His2?(colors.primary):(colors.grey),
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                 
                  
                  }}>Upgrade To Reseller</Text>
                <View
                style={{
                    backgroundColor:colors.primaryLight,
                    padding:5,
                    borderRadius:100,
                
                }}>
                <Entypo name="shop" size={13} color={colors.primary} /></View>
                  </Pressable>
                
                  


                  </View>
                  
                  <Space height={30}/>
                   
                 {His1?(
                <View>
                <View style={{backgroundColor:colors.white,width:"85%",height:150,borderRadius:10,flexDirection:"column",alignSelf:"center"}}>
                <Space height={20}/>
                <Image source={emages.Lock} style={{left:15,}}/>
                
                <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:16,
                  left:20,
                  top:10
                  
                  }}>Account verification</Text>
                  <Space height={10}/>
               <View style={{width:"80%"}}>
               <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:12,
                  left:20,
                  top:10
                  
                  }}>We'll need your BVN to verify and upgrade your account for you.</Text>
               </View>

               
                </View>
             <Space height={20}/>

             {bvns?(
              <View style={{
               
               
                alignItems:"center",
                backgroundColor:colors.swhite,
                width:"85%",
                alignSelf:"center",
                height:100,
                
                top:-30,
                justifyContent:"center",
              
                }}>
            <Feather name="check-circle" size={50} color={colors.grey} style={{}}/>
            
             </View>
             ):(
           <View style={{
            flexDirection:"row",
           
            alignItems:"center",
            backgroundColor:colors.white,
            width:"85%",
            alignSelf:"center",
            height:100,
            
            top:-30,
            justifyContent:"space-around"
            }}>
                
             <TextInput 
                style={{
                backgroundColor:"#FFF",
                borderRadius:4,
                borderColor:"#0F0D23",
                width:"70%",
                alignSelf:"center",
                fontSize:15,
                fontFamily:"Poppins-Bold",
                height:55,
                left:10
                 }}
                value={bvn}
                onChangeText={bvn=>setBvn(bvn)}
                label="BVN"
                disabled={Loading?(true):(false)}
                placeholder='Enter your 11 Digit BVN number'
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                keyboardType = 'number-pad'
                //keyboardType='number-pad'
                 mode="outlined"
                //disabled={Loading}
                />
            
            <View style={{left:5,top:2}}>
                         <Btn
                            Text="Go" 
                            Btncolor={colors.primary} 
                            radius={6}
                            height={55}
                            disabled={bvn.length==11?(false):(true)}
                            //loading={Loading}
                            onPress={()=>SubmitBVN()}
                             />
                        </View>
         </View>
       
       )}
                 
                 </View>):(
                 <>
                <View>
                <View style={{backgroundColor:colors.white,width:"85%",height:190,borderRadius:10,flexDirection:"column",alignSelf:"center"}}>
                <Space height={20}/>
                <View
                style={{
                    backgroundColor:colors.primaryLight,
                    
                    borderRadius:100,
                    width:50,
                    height:50,justifyContent:"center",
                    alignItems:"center",
                    left:20
                
                }}>
                <Entypo name="shop" size={23} color={colors.primary} /></View>

                <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:16,
                  left:20,
                  top:10
                  
                  }}>Upgrade Account </Text>
                  <Space height={10}/>
               <View style={{width:"80%"}}>
               <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:12,
                  left:20,
                  top:10
                  
                  }}>Premier Swap NG offers it's discounts for resellers on every transaction. To upgrade to reseller account you will be charged a fee of ₦{amt}.    </Text>
               </View>

               
                </View>
          <Space height={20}/>
          {resel?(
              <View style={{
               
               
                alignItems:"center",
                backgroundColor:colors.swhite,
                width:"85%",
                alignSelf:"center",
                height:100,
                
                top:-30,
                justifyContent:"center",
              
                }}>
            <Feather name="check-circle" size={50} color={colors.grey} style={{}}/>
             </View>
             ):(
           <View style={{
            flexDirection:"row",
           
            alignItems:"center",
            backgroundColor:colors.white,
            width:"85%",
            alignSelf:"center",
            height:100,
            
            top:-30,
            justifyContent:"space-around"
            }}>
                
            
            
            <View style={{left:5,top:2,width:"100%"}}>
                         <Btn
                            Text={`Upgrade Now with ₦${amt}`}
                            Btncolor={colors.primary} 
                            radius={6}
                            height={55}
                            disabled={Loading}
                            //loading={Loading}
                            onPress={()=>SubmitResel()}
                             />
                        </View>
         </View>
       
             )}
                 
                 </View>
                 
                 </>)}


                 <Space height={100}/>
                   


        </View>
      )}
     </ScrollView>
                    
                   <LoadingScreen Show={Loading} noLogo={true}/>
      </SafeAreaView>
    </SafeAreaProvider>
    );
};

// define your styles


//make this component available to the app
export default AddBvn;
