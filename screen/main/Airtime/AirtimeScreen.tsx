import { View, Text,ScrollView,SafeAreaView,KeyboardAvoidingView,Platform} from 'react-native'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ServiceAmt, Space, TopBar,colors, emages,LoadingScreen, PaymentModal,Tpins,useIsReady } from '../../../utility'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {NetworkCard,Btn} from '../../../utility/index';
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { StorageGet } from '../../../service/storage'
import * as Haptics from 'expo-haptics';
import { BuyAirime } from '../../service'
import { NumericFormat } from 'react-number-format';
import { ToastContext } from '../../../context/AlertContext'


const AirtimeScreen = () => {
    const navigation=useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 
    const [gloactive,setGlo] =useState(false);
    const [mtnactive,setMtn]=useState(false);
    const [aactive,setA]=useState(false);
    const [mobileactive,setNmobile]=useState(false);
    const [Network,setNetwork]=useState(4);
    const [Phone,setPhone]=useState("");
    const [ProductName,setPname]=useState("Glo");
    const [ProductImage,setPImage]=useState(emages.Glo);
    const [amt,setAmt]= useState("");
    const [Loading, setLoad] = useState(false);
    const [Loading2, setLoad2] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);
    const [states, setState] = useState<any>(0);
    const isReady = useIsReady(states);
    const ChooseNetwork = (network:string) =>{
        Haptics.selectionAsync()
        if (gloactive){
            setGlo(false);
            setNetwork(0);
        } 
        if (mtnactive) {
            setMtn(false);
            setNetwork(0);
        }
        if (aactive){
            setA(false);
            setNetwork(0);
        }
        if (mobileactive){
            setNmobile(false);
            setNetwork(0);
        }

        if (network=="glo"){
            setGlo(true);
            setPname("Glo");
            setPImage(emages.Glo);
            setNetwork(4);
        } 
        if (network=="mtn") {
            setMtn(true);
            setNetwork(1);
            setPname("Mtn");
            setPImage(emages.Mtn);
        }
        if (network=="Airtel"){
            setA(true);
            setNetwork(2);
            setPname("Airtel");
            setPImage(emages.Airtel);
        }
        if (network=="9mobile"){
            setNmobile(true);
            setNetwork(3);
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
        //setLoad2(true);
        StorageGet("@app_login_code")
        .then((db)=>{
            console.log(db)
            let payload=JSON.stringify({
                appcode:db,
                amount: amt,
                phone:Phone,
                network:Network
            });
           BuyAirime(payload)
           .then((req)=>{ 
            // setLoad(false);
            // ClosePin(false);
            
            if(req?.data.status == true) {
                
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                //setLoad2(false);
                navigation.navigate('PaymentSuccess',{
                    status:"Successful!",
                    amount:amt,
                    productType:"Airtime",
                    ProductImage:ProductImage,
                    ProductStatus:req?.data.msg

                });
                
            } else {
                //setState(states+1)
               // setLoad(false);
                //ClosePin(false);
                EnableToast(true);
                setEtype("Error");
                setTitle("Error Info");
                setMsg(`${req?.data.msg}`);
                navigation.navigate('PaymentSuccess',{
                    status:"Failed!",
                    amount:amt,
                    productType:"Airtime",
                    ProductImage:ProductImage,
                    ProductStatus:req?.data.msg

                });
                console.log(req?.data)
            }

           });
        }).catch((e)=>{
            setLoad(false)
        });
       }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1,backgroundColor:colors.lightgrey,}}>
    <StatusBar />
  
    
            <TopBar 
            Title="Buy Airtime" 
            Back={true} 
            onClick={()=>navigation.navigate('BottomNav')}/>
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
                  IconSrc={emages.Glo}
                  onClick={()=>ChooseNetwork("glo")}
                  active={gloactive}
                  />
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
         <Space height={0}/>
         <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                    Enter your mobile number 
            </Text>
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
                width:'95%',
                alignSelf:"center",
                
                 }}
                value={Phone}
                onChangeText={Phone=>setPhone(Phone.replace(/[^0-9]/g, ''))}
                label={<Text style={{fontFamily:"Poppins-SemiBold",fontSize:13}}>+234</Text>}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                keyboardType='number-pad'
               
                maxLength={11}
                />
            </View>
            <Space height={20}/>
            <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                   Enter your amount
            </Text>
            <Space height={20}/>
            <View style={{
                backgroundColor:"white",
                height:100,
                width:"100%",
                //borderRadius:10,
                flexDirection:"row",
                justifyContent:"space-around",
                alignItems:"center",
                 alignSelf:"center"
                
                }}>
                    
                    <ServiceAmt
                    label={50}
                    reward="0"
                    onClick={()=>setAmt("50")}
                    />
                    <ServiceAmt
                       label={100}
                       reward="0"
                       onClick={()=>setAmt("100")}
                    />
                    <ServiceAmt
                       label={200}
                       reward="1"
                       onClick={()=>setAmt("200")}
                    />
                   
                </View>
             
                <View style={{
                backgroundColor:"white",
                height:75,
               
               
                width:"100%",
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
                                backgroundColor:colors.white,
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
                            maxLength={4}
                        />
                       </View>
                    <View style={{top:20,left:10}}>
                         <Btn
                            Text="Pay" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={Phone.length!=11?(true):(amt.length==0?(true):(false))}
                            onPress={()=>Payment()}
                             />

                    </View>
                    <Space height={50}/>
                        </View>
                      
                        <Space height={160}/>
                    
                    </View>

                </ScrollView>
                  <PaymentModal 
                  Show={Modal} 
                  setShow={setShow}
                  Product='Airtime'
                  ProductName={ProductName}
                  ProductImage={ProductImage}
                  Amount={amt}
                  onClick={()=>Checkout()}
                  />
                  <Tpins 
                  Show={Tpin}
                  setShow={ClosePin}
                  PStatus={setLoad2}
                  //setLoad2={setLoad2}
                  onClick={()=>CompletePayment()}
                  />
             
                
                    </SafeAreaView>
                  
                    
             </KeyboardAvoidingView>
  )
}

export default  AirtimeScreen