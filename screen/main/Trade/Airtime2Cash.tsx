import { View, Text,ScrollView,SafeAreaView,KeyboardAvoidingView,Platform, Pressable,Image} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ServiceAmt, Space, TopBar,colors, emages,LoadingScreen, PaymentModal,Tpins,Alerts,useIsReady, } from '../../../utility'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {NetworkCard,Btn} from '../../../utility/index';
import { TextInput } from 'react-native-paper'
import { MaterialIcons ,Feather,FontAwesome,Ionicons } from '@expo/vector-icons';
import { StorageGet } from '../../../service/storage'
import * as Haptics from 'expo-haptics';
import { AirtimeConvert, BuyAirime } from '../../service'
import * as Clipboard from 'expo-clipboard';
import { ToastContext } from '../../../context/AlertContext'

const Airtime2Cash = () => {
    const navigation=useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 
    const [gloactive,setGlo] =useState(false);
    const [mtnactive,setMtn]=useState(false);
    const [aactive,setA]=useState(false);
    const [mobileactive,setNmobile]=useState(false);
    const [Network,setNetwork]=useState("0");
    const [Phone,setPhone]=useState("08000000000");
    const [ProductName,setPname]=useState("Glo");
    const [ProductImage,setPImage]=useState(emages.Glo);
    const [amt,setAmt]= useState("0");
    const [amt2,setAmt2]= useState("0");
    const [amt3,setAmt3]= useState("0");
    const [nto,setto]= useState("0");
    const [charge,setCharge]= useState("0");
    const [Loading, setLoad] = useState(false);
    const [Loading2, setLoad2] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);
    const[D,setD]=useState(false);
  
    const [states, setState] = useState<any>(0);
    const isReady = useIsReady(states);
    const [error,setError]=useState(false);
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(nto);
              
                  setError(true);
                  setEtype("Success")
                  setTitle("Copied!");
                  setMsg(`Copied successful.`);
      };
    const ChooseNetwork = (network:string) =>{
        Haptics.selectionAsync()
        if (gloactive){
            setGlo(false);
            setNetwork("0");
        } 
        if (mtnactive) {
            setMtn(false);
            setNetwork("0");
        }
        if (aactive){
            setA(false);
            setNetwork("");
        }
        if (mobileactive){
            setNmobile(false);
            setNetwork("");
        }

       
        if (network=="mtn") {
            setMtn(true);
            setNetwork("mtn");
            setPname("Mtn");
            setPImage(emages.Mtn);
        }
        if (network=="Airtel"){
            setA(true);
            setNetwork("airtel");
            setPname("Airtel");
            setPImage(emages.Airtel);
        }
        if (network=="9mobile"){
            setNmobile(true);
            setNetwork("9mobile");
            setPname("9mobile");
            setPImage(emages.Nmobile);
        }
       
    }

    const Payment=()=>{
     setShow(true);
    }
    
    const Checkout = () => {
        setShow(false);
        ClosePin(true);
    }
    const CompletePayment= async()=>{
        setLoad(true)
        StorageGet("@app_login_code")
        .then((db)=>{
            console.log(db)
            let payload=JSON.stringify({
                appcode:db,
                amount:amt,
                phone:Phone,
                network:Network,
                type:'Pay'
            });
           AirtimeConvert(payload)
           .then((req)=>{ 
            // setLoad(false);
            // ClosePin(false);
            if(req?.data.code == 200) {
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                navigation.navigate('PaymentSuccess',{
                    status:"Successful!",
                    amount:amt,
                    productType:"Airtime2Cash",
                    ProductImage:ProductImage,
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
                    productType:"Airtime2Cash",
                    ProductImage:ProductImage,
                    ProductStatus:req?.data.msg

                });
            }
            console.log(req?.data)
           });
        }).catch((e)=>{
            setLoad(false)
        });
       }

       const GetFee=()=>{
        setLoad2(true)
        StorageGet("@app_login_code")
        .then((db)=>{
        
        let payload=JSON.stringify({
               appcode:db,
                network:Network,
                amount:amt,
                type:"getFee"
                
                
            });
            AirtimeConvert(payload).then((req)=>{

            if(req?.data.code==200){
            setAmt2(`${req?.data.amount}`)
            setto(req?.data.mobile)
            setCharge(req?.data.charge)
            }else{
            console.log(req?.data)
            }
            setLoad2(false)
            console.log(req?.data)
            })
        })
       }
       useEffect(()=>{
        if(amt!="0"){
           if(Network!="0"){
            setTimeout(() => {
                GetFee();
            }, 2000);
           }
        }
    },[amt,Network])
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1,backgroundColor:colors.swhite,}}>
    <StatusBar />
  
    
            <TopBar 
            Title="Airtime2Cash" 
            Back={true} 
            onClick={()=>navigation.navigate('TradeScreen')}/>
            <SafeAreaView>
           
            <ScrollView>
            
          <Space height={13}/>
           <View style={{}}>

           <View style={{
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
            backgroundColor:colors.white,
            width:"100%",
            alignSelf:"center",
            height:100,
            borderRadius:8,
            top:-20
            }}>
                 
                 <NetworkCard 
                  IconSrc={emages.Mtn}
                  onClick={()=>ChooseNetwork("mtn")}
                  active={mtnactive}
                  />
                  <NetworkCard 
                  IconSrc={emages.Airtel}
                  onClick={()=>ChooseNetwork("Airtel")}
                  active={aactive}
                  />
                  <NetworkCard 
                  IconSrc={emages.Nmobile}
                  onClick={()=>ChooseNetwork("9mobile")}
                  active={mobileactive}
                  />
                  </View>
       
         
           
                    <Space height={30}/>
                    </View>
                      
                <View style={{
                    flexDirection:"column",
                    
                    alignItems:"center",
                    backgroundColor:colors.white,
                    width:"95%",
                    alignSelf:"center",
                    height:D?(350):(310),
                    //borderRadius:15,
                    top:-20,
                    position:"relative"
                    }}>
                <Space height={20}/>
                {D?(<>
                  <Pressable style={{flexDirection:"row",justifyContent:"space-around"}}>

                    <Pressable style={{backgroundColor:colors.swhite,borderRadius:100,width:105,height:25,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                    <MaterialIcons name="error" size={15} color="orange" />
                    <Text style={{color:colors.secondary,fontFamily:"Poppins-Regular",}}> Warning</Text>
                    </Pressable>
                      <View style={{width:"60%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                      <Text style={{fontFamily:"DMSans-Bold",color:colors.secondary,left:0}}>Kindly transfer the sum of ₦{amt} only to the {Network} phone number below</Text>
                    </View>
                  </Pressable>


                  <Space height={20}/>
                   <Pressable style={{flexDirection:"row",justifyContent:"space-around"}}>

                    <Pressable style={{backgroundColor:colors.swhite,borderRadius:100,width:105,height:25,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                    <MaterialIcons name="error" size={15} color="orange" />
                    <Text style={{color:colors.secondary,fontFamily:"Poppins-Regular",}}> Warning</Text>
                    </Pressable>
                      <View style={{width:"60%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                      <Text style={{fontFamily:"DMSans-Bold",color:'red',left:5}}>Please avoid sending same request twice to avoid termination of your account
                     </Text>
                    </View>
                  </Pressable>

                    <Space height={20}/>
                  

                    <Pressable 
                     onPress={copyToClipboard}
                    style={{backgroundColor:colors.swhite,borderRadius:100,width:175,height:28,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                   <Text style={{color:colors.secondary,fontFamily:"Poppins-Regular",fontSize:20}}>{nto}</Text>
                   <Ionicons name="ios-copy" size={15} color={colors.primary} style={{left:10}}/>
                    </Pressable>
                      

                   <Space height={20}/>
                   <Pressable style={{flexDirection:"row",justifyContent:"space-around"}}>

                    <Pressable style={{backgroundColor:colors.swhite,borderRadius:100,width:105,height:25,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                    <MaterialIcons name="error" size={15} color="orange" />
                    <Text style={{color:colors.secondary,fontFamily:"Poppins-Regular",}}>Note</Text>
                    </Pressable>
                      <View style={{width:"60%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                      <Text style={{fontFamily:"DMSans-Bold",color:colors.secondary,left:0}}>Use the "Submit" button below only after you have transferred the airtime.</Text>
                    </View>
                  </Pressable>
                  <Space height={20}/>
                <View style={{width:"80%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <View style={{top:20,left:10,width:"60%"}}>
                         <Btn
                            Text="Cancel" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            //disabled={Network=="0"?(true):(amt=="0"?(true):(Phone=="08000000000"?(true):(Phone.length==11?(Loading2?(true):(false)):(true))))}
                            onPress={()=>setD(false)}
                            //loading={Loading2}
                             />

                    </View>
                    <View style={{top:20,left:10,width:"60%"}}>
                         <Btn
                            Text="Submit" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            //disabled={Network=="0"?(true):(amt=="0"?(true):(Phone=="08000000000"?(true):(Phone.length==11?(Loading2?(true):(false)):(true))))}
                            onPress={()=>Payment()}
                            //loading={Loading2}
                             />

                    </View>
                </View>
                
                
                </>):(<>
                
                
             <View style={{width:"60%",left:-52}}>
                <Text style={{fontFamily:"Poppins-Regular",color:colors.primary,}}>{Network=="0"?([]):(Network.toUpperCase())} Charges: ₦{charge}</Text>
               
                </View>
             
                <Space height={10}/>
                 <Pressable style={{
                   backgroundColor:colors.primaryLight,width:"90%",height:70,borderRadius:0,
                   justifyContent:"space-evenly",
                   alignItems:"center",
                   flexDirection:"row",

                    }}>
                <View style={{marginTop:20,width:"60%"}}>
                       <TextInput 
                            style={{
                            backgroundColor:colors.primaryLight,
                            borderRadius:0,
                            borderColor:"#0F0D23",
                            width:'120%',
                            
                        
                            height:65,
                         
                             top:-8,
                             left:-20,
                             fontFamily:"Poppins-Bold",
                             
                            }}
                            value={amt2}
                            onChangeText={amt2=>setAmt2(amt2)}
                            label={<Text style={{fontFamily:"Poppins-Regular",color:colors.primary}}>You will receive </Text>}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            keyboardType='number-pad'
                            disabled={true}
                           
                        />
                       </View>
          
              
                            <Pressable style={{backgroundColor:colors.white,borderRadius:100,width:40,height:40,alignItems:"center",justifyContent:"center",}}>
                            <Image source={emages.Country} style={{width:17, height:17}}/>
                            <Text style={{fontFamily:"DMSans-Bold",fontSize:8}}>NGN</Text>
                            </Pressable>
                            </Pressable>
              
                            <Space height={15}/>
                            <Pressable style={{
                                backgroundColor:colors.primaryLight,width:"90%",height:70,borderRadius:0,
                                justifyContent:"space-evenly",
                                alignItems:"center",
                            
                                }}>
              
               <Pressable style={{backgroundColor:colors.primary,borderRadius:100,width:40,height:40,alignItems:"center",justifyContent:"center",position:"absolute",top:-30,}}>
               <Feather name="refresh-cw" size={18} color={colors.white} />
               {/* <FontAwesome  name="refresh" size={20} color={colors.white} /> */}
               </Pressable>
               <View style={{flexDirection:"row",justifyContent:"space-evenly",
                alignItems:"center",top:5,width:"100%"}}>
               <View style={{marginTop:20,width:"60%"}}>
                       <TextInput 
                            style={{
                            backgroundColor:colors.primaryLight,
                            borderRadius:0,
                            borderColor:"#0F0D23",
                            width:'120%',
                            
                         
                            height:60,
                         
                             top:-10,
                             left:-17,
                             fontFamily:"DMSans-Medium",
                            }}
                            value={amt}
                            onChangeText={amt=>setAmt(amt.replace(/[^0-9]/g, ''))}
                            // onChange={GetFee()}
                            label={<Text style={{fontFamily:"Poppins-Regular",top:-10}}>You pay</Text>}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            keyboardType='number-pad'

                        />
                       </View>  
                    <Pressable style={{backgroundColor:colors.white,borderRadius:100,width:40,height:40,alignItems:"center",justifyContent:"center",}}>
                    <Image source={emages.Country} style={{width:17, height:17}}/>
                    <Text style={{fontFamily:"DMSans-Bold",fontSize:8}}>NGN</Text>
                    </Pressable>

               </View>
               
               </Pressable>
               <Space height={20}/>
        <View style={{width:"60%",left:-40}}>
              <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:0,
                    fontSize:13

            }}>
             Enter the phone number you want to transfer the airtime from
            </Text>
            </View>
            <Space height={20}/>
               <View style={{
                backgroundColor:"white",
                height:70,
                justifyContent:"center",
               
                width:"100%",
                alignSelf:"center"
                }}>
            <TextInput 
                style={{backgroundColor:"#FFF",
                borderRadius:4,
                borderColor:"#0F0D23",
                width:'85%',
                alignSelf:"center",
                
                 }}
                 
                value={Phone}
                onChangeText={Phone=>setPhone(Phone.replace(/[^0-9]/g, ''))}
                label={<Text style={{fontFamily:"Poppins-SemiBold",fontSize:13}}>+234</Text>}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                keyboardType='number-pad'
                placeholder='Enter your complete phone number'
                mode='outlined'
                maxLength={11}
                />
            </View>


             <View style={{top:20,left:10,width:"95%"}}>
                         <Btn
                            Text="Continue" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={Network=="0"?(true):(amt=="0"?(true):(Phone=="08000000000"?(true):(Phone.length==11?(Loading2?(true):(false)):(true))))}
                            onPress={()=>setD(true)}
                            loading={Loading2}
                             />

                    </View>
                
            
                
                
                </>)}
                </View>
            
            <Space height={200}/>
                    
                    

                </ScrollView>
                  <PaymentModal 
                  Show={Modal} 
                  setShow={setShow}
                  Product='Airtime2Cash'
                  ProductName={ProductName}
                  ProductImage={ProductImage}
                  Amount={amt}
                  onClick={()=>Checkout()}
                  />
                  <Tpins 
                  Show={Tpin}
                  setShow={ClosePin}
                  PStatus={Loading}
                  onClick={()=>CompletePayment()}
                  />
              
                     {isReady?(<LoadingScreen Show={Loading} noLogo={true}/>):([])}
                    </SafeAreaView>
                  
                    
             </KeyboardAvoidingView>
  )
}

export default  Airtime2Cash