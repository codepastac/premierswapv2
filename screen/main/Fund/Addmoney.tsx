//import liraries
import { View, Text,SafeAreaView, ScrollView,Pressable,Image} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { colors,HisTable,Space,TopBar ,emages,NetworkCard,Btn,Alerts,LoadingScreen, Slash} from '../../../utility';
import {  SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Avatar, Card} from 'react-native-paper';
import {TextInput,Tooltip} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { StatusBar } from 'expo-status-bar';
import { StorageGet } from '../../../service/storage';
import { Acc_details, CreateAccount, FetchBalance, Upgrade } from '../../service';
//import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { MaterialIcons,MaterialCommunityIcons,AntDesign,Ionicons,Entypo,Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { StateRefresh } from '../../../context/StateRefresh';
import { ToastContext } from '../../../context/AlertContext';
// create a component
const AddMoney = () => {
  const {refresh,setRefresh}=useContext(StateRefresh);
    const  navigation=useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 

    const [His1,setHis1]= useState(true);
    const [His2,setHis2]= useState(false);
    const [Loading,setLoadss]= useState(false);
    const [Loadings,setLoads]= useState(false);
    const [bvn,setBvn]= useState(false);
   
    const [email, setUsername] = useState("");
    const [password, setPwd] = useState("");
    const [fee, setFee] = useState("");
   
    const [amt, setamt] = useState("0");
    const [acct,setAcct]= useState(false);
    const [acct_name,setan]= useState("");
    const [acct_no,setano]= useState("");
    const [bank_name,setbn]= useState("");
    const [error,setError]=useState(false);
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(acct_no);
        setLoads(false);
                  setError(true);
                  setEtype("Success")
                  setTitle("Copied!");
                  setMsg(`Your Account number was copied successful.`);
      };
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
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                    console.log(req?.data)
                  } else {
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
              const _Createacct=()=>{
                setLoadss(true);
                StorageGet("@app_login_code")
                    .then((db)=>{
                        console.log(db)
                        //setamt("loading.....");
                        let payload=JSON.stringify({
                            appcode:db,
                          });
                        CreateAccount(payload).then((req)=>{
                          setRefresh(refresh+1);
                           if(req?.data.status==true){
                          
                            EnableToast(true);
                            setEtype("Success");
                            setTitle("Account Created Successful!");
                            setMsg(`${req?.data.msg}`);
                              
                            console.log(req?.data)
                           } else {
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
   
              useEffect(()=>{
               setLoads(true)
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
                      setBvn(req?.data.bvn);
                    
                      setan(req?.data.acct_name)
                      setano(req?.data.acct_no)
                      setbn(req?.data.bank)
                      setFee(req?.data.fee)
                      setLoads(false);
                      console.log(Loading)
                    });
                  }).catch((e)=>{
                    console.log(e);
                    setLoads(false)
                    console.log(Loading)
                  })
            
            },[refresh])
             
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
                <StatusBar/>
                <TopBar Title="Fund Wallet" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
                <SafeAreaView>
        
                <ScrollView>

                <Space height={40}/>
                    {Loadings?([]):(
                       <View>
                       <View style={{backgroundColor:colors.white,width:"90%",height:acct?(370):(190),borderRadius:10,flexDirection:"column",alignSelf:"center"}}>
                       <Space height={20}/>
                       <View
                       style={{
                           backgroundColor:colors.primaryLight,
                           
                           borderRadius:100,
                           width:50,
                           height:50,
                           justifyContent:"center",
                           alignItems:"center",
                           left:20
                       
                       }}>
                       <MaterialCommunityIcons name="bank-plus" size={23} color={colors.primary} /></View>
                       
                       <Text style={{color:colors.secondary,
                       fontFamily:"DMSans-Bold",
                       fontSize:16,
                       left:25,
                       top:15
                       
                       }}>Virtual Account</Text>
                       


               <View style={{width:"80%"}}>
               <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:12,
                  left:25,
                  marginTop:20
                  
                  }}>Your Wallet will be Credited Automatically. Note that you will be charged NGN{fee} for each transfer. This funding method has no minimum funding amount.</Text>
               </View>

                    <Space height={10}/>
                    {acct?(<>
                       <Space height={20}/>
                       <Slash/>
                       <Space height={20}/>
                       <View style={{flexDirection:"column",width:"85%",alignSelf:"center",justifyContent:"space-evenly"}}>
                           <Pressable 
                           onPress={copyToClipboard}
                           style={{flexDirection:"row",justifyContent:"space-between"}}>
                               <Text
                               style={{ fontFamily:"Poppins-Regular",fontSize:13}}
                                >Account Number</Text>
                               
                               <Text
                                style={{ fontFamily:"Poppins-Bold",fontSize:13}}
                                >{acct_no} <Feather name="copy" size={15} color={colors.primary} /></Text>
                                
                                
                             </Pressable>
                          
                             <Space height={20}/>
                               <Slash/>
                               <Space height={20}/>

                           <Pressable style={{flexDirection:"row",justifyContent:"space-between"}}>
                               <Text
                               style={{ fontFamily:"Poppins-Regular",fontSize:13}}
                                >Account Name</Text>
                               
                               <Text
                                style={{ fontFamily:"Poppins-Bold",fontSize:13,left:-10}}
                                >{acct_name}</Text>
                           </Pressable>
                           
                           <Space height={20}/>
                               <Slash/>
                               <Space height={20}/>


                           <Pressable style={{flexDirection:"row",justifyContent:"space-between"}}>
                               <Text
                               style={{ fontFamily:"Poppins-Regular",fontSize:13,left:0}}
                                >Bank Name</Text>
                               
                               <Text
                                style={{ fontFamily:"Poppins-Bold",fontSize:13}}
                                >{bank_name}</Text>
                           </Pressable>
                       </View>
                    
                       
                    </>):(
                   <View style={{width:"80%"}}>
                   <Text style={{color:colors.grey,
                       fontFamily:"DMSans-Medium",
                       fontSize:12,
                       left:25,
                       top:20
                       
                       }}>Create your own personal virtual account in min to receive payment on your Premier Swap NG Account.</Text>
                   </View>
                    )}
                   
                       </View>
                      
                       {acct?(<>
                       
                       </>):(
                           <>
                           <Space height={20}/>
               <View style={{
                   flexDirection:"row",
               
                   alignItems:"center",
                   backgroundColor:colors.white,
                   width:"90%",
                   alignSelf:"center",
                   height:100,
                   
                   top:-30,
                   justifyContent:"space-around"
                   }}>
                       
                   
                   
                   <View style={{left:5,top:2,width:"100%"}}>
                               <Btn
                                   Text={`Create Virtual Account`}
                                   Btncolor={colors.primary} 
                                   radius={6}
                                   height={55}
                                   disabled={bvn?(Loading?(true):(false)):(true)}
                                   //loading={Loading}
                                   onPress={()=>_Createacct()}
                                   />
                </View>
               </View>
                           </>
               )}

                       
           </View>
                    )}
                <Space height={100}/>
                <LoadingScreen Show={Loading} noLogo={true}/>
                </ScrollView>
                  
                    
      </SafeAreaView>
    </SafeAreaProvider>
    );
};

// define your styles


//make this component available to the app
export default AddMoney;
