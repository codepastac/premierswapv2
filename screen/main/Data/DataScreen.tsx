import { View, Text,ScrollView,SafeAreaView,KeyboardAvoidingView,Platform} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ServiceAmt, Space, TopBar,colors, emages,LoadingScreen, PaymentModal,Tpins, Slash, DataItemBox, DataPlan, Alerts,useIsReady } from '../../../utility'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import {NetworkCard,Btn} from '../../../utility/index';
import { TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import { StorageGet } from '../../../service/storage'
import * as Haptics from 'expo-haptics';
import { BuyData } from '../../service'
import { ToastContext } from '../../../context/AlertContext'
//import { NumericFormat } from 'react-number-format';


const DataScreen = () => {
    const navigation=useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
    const [gloactive,setGlo]=useState(false);
    const [mtnactive,setMtn]=useState(false);
    const [aactive,setA]=useState(false);
    const [mobileactive,setNmobile]=useState(false);
    const [Network,setNetwork]=useState("");
    const [Phone,setPhone]=useState("");
    const [ProductName,setPname]=useState("Glo");
    const [ProductImage,setPImage]=useState(emages.Glo);
    const [amt,setAmt]=useState("");
    const [pamt,setpamt]=useState("");
    const [plan,setplan]=useState("");
    const [states, setState] = useState<any>(0);
    const isReady = useIsReady(states);
    const [Loading, setLoad] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);
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
            setNetwork("0");
        }
        if (mobileactive){
            setNmobile(false);
            setNetwork("0");
        }

        if (network=="glo"){
            setGlo(true);
            setPname("Glo");
            setPImage(emages.Glo);
            setNetwork("02");
        } 
        if (network=="mtn") {
            setMtn(true);
            setNetwork("01");
            setPname("Mtn");
            setPImage(emages.Mtn);
        }
        if (network=="Airtel"){
            setA(true);
            setNetwork("03");
            setPname("Airtel");
            setPImage(emages.Airtel);
        }
        if (network=="9mobile"){
            setNmobile(true);
            setNetwork("04");
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
        console.log(Network);
    }
    //$payload['userid'],$api_data->plan,$api_data->phone,$api_data->network,$api_data->amount
    const CompletePayment= async()=>{
        setLoad(true)
        StorageGet("@app_login_code")
        .then((db)=>{
            console.log(db)
            let payload=JSON.stringify({
                appcode:db,
                //amount:pamt,
                phone:Phone,
                network:Network,
                plan:plan
            });
         console.log(payload)
           BuyData(payload)
           .then((req)=>{ 
           
            if(req?.data.status == true) {
                
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                //setLoad2(false);
                navigation.navigate('PaymentSuccess',{
                    status:"Successful!",
                    amount:amt,
                    productType:"Data",
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
                    productType:"Data",
                    ProductImage:ProductImage,
                    ProductStatus:req?.data.msg

                });
                console.log(req?.data);
            }

           });
        }).catch((e)=>{
            setLoad(false)
            console.log(e);
        });
        
       }

     

      
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1,backgroundColor:colors.lightgrey,}}>
    <StatusBar />
  
    
            <TopBar 
            Title="Mobile Data" 
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
               
                width:"97%",
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
                onChangeText={Phone=>setPhone(Phone)}
                label={<Text style={{fontFamily:"Poppins-SemiBold",fontSize:13}}>+234</Text>}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                keyboardType='number-pad'
               
                />
            </View>
        
                        <Space height={0}/>
                    {Network==""?(<></>):( 
                     <DataPlan 
                       Network={Network} 
                       Amt={setAmt} 
                       plan={setplan}
                       pamt={setpamt}
                       onClick={()=>Payment()} 
                       />
                       )}
                                        
                
                            <Space height={0}/>
                            <View style={{left:10,width:"90%",alignSelf:"center"}}>
                        

                    </View>
                
                        <Space height={100}/>
                    
                    </View>

                </ScrollView>
                  { 
                  Phone.length==11?(
                  <PaymentModal 
                    Show={Modal} 
                    setShow={setShow}
                    Product='Mobile-Data'
                    ProductName={ProductName}
                    ProductImage={ProductImage}
                    Amount={amt}
                    onClick={()=>Checkout()}
                    />):(
                       <></>
                      
                    )

                  }
                  <Tpins 
                  Show={Tpin}
                  setShow={ClosePin}
                  PStatus={Loading}
                  onClick={()=>CompletePayment()}
                  />
                
                    </SafeAreaView>
                  
                    
             </KeyboardAvoidingView>
  )
}

export default  DataScreen