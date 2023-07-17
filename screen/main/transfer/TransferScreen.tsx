//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image,} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts ,useIsReady} from '../../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { TextInput , ActivityIndicator} from 'react-native-paper';
import { Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import { ToastContext } from '../../../context/AlertContext';
//import { ToastContainer, toast } from 'react-toastify';

// create a component
const TransferScreen = () => {
  const {refresh,setRefresh}=useContext(StateRefresh)
  const navigation= useNavigation() as any;
  const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
    const [bank_name,setBank]=useState("Select Bank");
    const [bank_code,setBankCode]=useState("");
    const [acct,setAcct]=useState("");
    const [customer,setCus]=useState("");
    const [complete,setCM]=useState("");
    const [amt,setAmt]=useState("");
    const [Show,setShow]=useState(false);
    const [Load,setLoadss]= useState(false);
    const [Loading, setLoad] = useState(false);
    const [Loading2, setLoad2] = useState(false);
    const [Modal, setShows] = useState(false);
    const [Tpin, ClosePin] = useState(false);
    const[D,setD]=useState(false);
    
    const [states, setState] = useState<any>(0);
    const isReady = useIsReady(states);
    const [error,setError]=useState(false);
    const Complete_Payment=()=>{
      //setLoadss(true)
      StorageGet("@app_login_code")
      .then((db)=>{
      
      let payload=JSON.stringify({
             appcode:db,
              acctno:acct,
              bank_code:bank_code,
              amt:amt,
              bank_name:bank_name,
              type:"Pay"
              });
              Withdraws(payload).then((req)=>{
                if(req?.data.code == 200){
                  EnableToast(true);
                  setEtype("Success");
                  setTitle("Transaction Successful!");
                  setMsg(`${req?.data.msg}`);
                navigation.navigate('PaymentSuccess',{
                  status:"Successful!",
                  amount:amt,
                  productType:"Withdrawal",
                  ProductImage:emages.icon,
                  ProductStatus:req?.data.msg

              });
             
                } else {
                  EnableToast(true);
                  setEtype("Error");
                  setTitle("Error Info");
                  setMsg(`${req?.data.msg}`);
                  navigation.navigate('PaymentSuccess',{
                    status:"Failed!",
                    amount:amt,
                    productType:"Withdrawal",
                    ProductImage:emages.icon,
                    ProductStatus:req?.data.msg
                  });
                }
                //setRefresh(refresh+1)
             
              })
        })
    }

  useEffect(()=>{
    if(acct.length==10){
     if(bank_code.length!=0){
      setLoadss(true)
      StorageGet("@app_login_code")
      .then((db)=>{
      
      let payload=JSON.stringify({
             appcode:db,
              acctno:acct,
              bank_code:bank_code,
              type:"Verify"
              });
              Withdraws(payload).then((req)=>{
                setLoadss(false);
                setCus(req?.data.html);
                setCM(req?.data.code)
               console.log(req?.data)
               
              })
        })
     }
    }
  },[acct,bank_code])
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/> 
     <TopBar Title="Withdraw To Bank Account" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
      <SafeAreaView>
      <ScrollView>
      <Space height={14}/>
      <View style={{
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
            backgroundColor:colors.swhite,
            width:"100%",
            alignSelf:"center",
            height:70,
            borderRadius:8,
            top:-20,
            
            }}>
                     <View style={{
                            
                            backgroundColor:colors.primaryLight,
                            width:40,
                            height:40,
                            borderRadius:100,
                            alignItems:"center",
                            justifyContent:"center",
                            left:10
                            }}>
                  
                   <MaterialCommunityIcons name="bank-transfer" size={24} color={colors.primary} style={{left:3}}
                   />
                     </View> 

                    <Pressable 
                    onPress={()=>{
                      setShow(true);
                    }}
                    style={{
                        backgroundColor:colors.line,
                        width:"80%",
                        borderRadius:6,
                        height:45,
                    
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }}>
                
                         <Text style={{left:20,fontFamily:"Poppins-Regular",}}>{bank_name}</Text>
                       
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={{right:10}}/>
                        </Pressable>

                        </View>

               <Space height={20}/>
               <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                   Account Number

            </Text>
            <Space height={10}/>
            <View style={{
                backgroundColor:colors.line,
                height:70,
                justifyContent:"center",
               
                width:"90%",
                alignSelf:"center",
                
                }}>
            <TextInput 
                style={{
                backgroundColor:"#FFF",
                borderRadius:4,
                borderColor:"#0F0D23",
                width:'100%',
                
                alignSelf:"center",
                
                
                 }}
                 value={acct}
                 onChangeText={acct=>setAcct(acct)}
                //label={<Text style={{fontFamily:"Poppins-SemiBold",fontSize:13}}>+234</Text>}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                keyboardType='number-pad'
                 mode="outlined"
                 //right={<TextInput.Icon icon="eye" />}
                 maxLength={15}
                />
             </View>
             <Space height={20}/>
            <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                  Account Name

            </Text>
            <View style={{
                backgroundColor:colors.line,
                height:70,
                 width:"90%",
                alignSelf:"center",
                flexDirection:"row",
                justifyContent:"space-between"
                 
                }}>
            {Load?( <View style={{left:30,justifyContent:"center",}}>
                        <ActivityIndicator/>
                    </View>):(
                        <></>
                    )

            }
            <TextInput 
                style={{
                backgroundColor:"#FFF",
                borderRadius:4,
                borderColor:"#0F0D23",
                width:Load?("80%"):("100%"),
                alignSelf:"center",
                  fontSize:11,
                  fontFamily:"Poppins-Bold"
                 }}
                 value={customer}
                // onChangeText={Phone=>setPhone(Phone)}
                //label={}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //keyboardType='number-pad'
                 mode="outlined"
                 disabled={true}
                />
            </View>
            <Space height={50}/>
            <View style={{
                backgroundColor:colors.swhite,
                height:75,
               
               
                width:"90%",
                alignSelf:"center",
                top:-16,
                flexDirection:"row",
                justifyContent:"space-between",
                
                }}>
                    <View style={{
                        top:20,
                        backgroundColor:colors.line,
                        width:40,
                        height:40,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        left:12
                        }}>
                    <Text 
                    style={{fontFamily:"Poppins-SemiBold",
                    fontSize:16}}>₦</Text>
                 </View>

                       <View style={{marginTop:20,width:"60%"}}>
                       <TextInput 
                            style={{
                            backgroundColor:colors.swhite,
                            borderRadius:0,
                            borderColor:"#0F0D23",
                            width:'100%',
                            left:12,
                        
                             height:40,
                          
                        }}
                            value={amt}
                            onChangeText={amt=>setAmt(amt.replace(/[^0-9]/g, ''))}
                            
                            label={""}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            keyboardType='number-pad'
                            maxLength={6}
                            //mode="outlined"

                        />
                       </View>
                    <View style={{top:20,left:10}}>
                         <Btn
                            Text="Pay" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={amt.length==0?(true):(complete=="200"?(false):(true))}
                            onPress={()=>ClosePin(true)}
                             />

                    </View>
                  
                        </View>
                    
           
                <Space height={220}/>

                </ScrollView>
              

                <BankModal 
                  Show={Show}
                  setShow={setShow}
                  PStatus={false}
                  setBank={setBank}
                  setBankCode={setBankCode}
                  onClick={()=>console.log("hi")}
                  />
                  <Tpins 
                  Show={Tpin}
                  setShow={ClosePin}
                  PStatus={Loading}
                  onClick={()=>Complete_Payment()}
                  />
                 
      </SafeAreaView>
    </SafeAreaProvider>
    );
};



//make this component available to the app
export default TransferScreen;
