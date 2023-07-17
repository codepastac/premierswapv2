//import liraries
import React, { Component,useContext,useEffect,useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, ActivityIndicator,KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,NetworkCard,Tpins,PaymentModal,Btn,useIsReady,LoadingScreen} from '../../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import Lottie from 'lottie-react-native';
import {BuyCoins, Cables} from '../../service';
import { StorageGet } from '../../../service/storage';
import CableList from '../../../utility/CableList';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons, Feather} from '@expo/vector-icons';
import { Menu, Button,Divider} from 'react-native-paper';
import Cable from '../../bills/Cable';
import { ToastContext } from '../../../context/AlertContext';
// create a component
const BuyCoin= () => {
   const navigation = useNavigation() as any;
   const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 

    const [gloactive,setGlo] =useState(false);
    const [mtnactive,setMtn]=useState(false);
    const [aactive,setA]=useState(false);
    const [mobileactive,setNmobile]=useState(false);
    const [Network,setNetwork]=useState("");
    const [NetworkName,setNetworkN]=useState("Select Coin Network");
    const [NetworkName2,setNetworkN2]=useState(null);
   
    const [Smartno,setSno]=useState("");
    const [ProductName,setPname]=useState("Dstv");
    const [ProductImage,setPImage]=useState(emages.icon);
    const [amt,setAmt]= useState("0");
    const [customer,setCust]= useState("");
    const [confirm,setCon]= useState(false);
    const [packageId,setPid]= useState("");
    const [Load,setLoadss]= useState(false);
    const [Loading, setLoad] = useState(false);
    const [Loading2, setLoad2] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [Meter,setMeter]=useState("Select meter type");
    const [Meterid,setMeterid]=useState("");
    const [amt2,setAmt2]= useState("0");
    const [Addr,setAddr]= useState("0");
    const [rate, setRate] = useState(null);
    const openMenu = () => setVisible(true);
    const [states, setState] = useState<any>(0);
    const isReady = useIsReady(states);
    const [Meterno,setMeterno]=useState("");
        const closeMenu = () => setVisible(false);
        const [visible2, setVisible2] = React.useState(false);

        const openMenu2 = () => setVisible2(true);

        const closeMenu2 = () => setVisible2(false);


        const Checkout = () => {
            setShow(false);
            ClosePin(true);
            console.log(Network);
        }
     
     const CompletePayment= async()=>{
         setLoad(true)
         StorageGet("@app_login_code")
         .then((db)=>{
             console.log(db)
             let payload=JSON.stringify({
                        appcode:db,
                        network_id:NetworkName,
                        wallet_addr:Addr,
                        amount:amt,
                        type:"Buy"
                
             });
          console.log(payload);
            BuyCoins(payload)
            .then((req)=>{ 
             
             if(req?.data.code == 200) {
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                 navigation.navigate('PaymentSuccess',{
                     status:"Successful!",
                     amount:amt2,
                     productType:"Crypto_Purchased",
                     ProductImage:ProductImage,
                     ProductStatus:req?.data.msg
 
                 });
                
                 //console.log(req?.data)
             } else {
                EnableToast(true);
                setEtype("Error");
                setTitle("Error Info");
                setMsg(`${req?.data.msg}`);
                 navigation.navigate('PaymentSuccess',{
                     status:"Failed!",
                     amount:amt2,
                     productType:"Crypto_Purchased",
                     ProductImage:ProductImage,
                     ProductStatus:req?.data.msg
 
                 });
            
                 //console.log(req?.data)
                 
             }
 
            });
         }).catch((e)=>{
             setLoad(false)
         });
         
        }
 
      
 


        useEffect(()=>{
           
                StorageGet("@app_login_code")
                .then((db)=>{
                    console.log(db)
                    let payload=JSON.stringify({
                        appcode:db,
                        type:"GetAll"
                    });
                    BuyCoins(payload).then((req)=>{
                        setNetworkN2(req?.data)
                        
                        //console.log(req?.data)
                    }).catch((e)=>{
                            console.log(e);
                            //setCust("Server offline");
                            alert(e)
                            setLoadss(false);
                    })
                });
            
           },[])
        

           useEffect(()=>{
           setTimeout(() => {
            if(amt!="0"){
                if(rate==null){
 
                } else {
                 setLoad2(true);
                 StorageGet("@app_login_code")
                     .then((db)=>{
                         console.log(db)
                         let payload=JSON.stringify({
                             appcode:db,
                             network_id:NetworkName,
                             amount:amt,
                             type:"getFee",
                             tp:"buy"
                         });
                         BuyCoins(payload).then((req)=>{
                             setAmt2(`${req?.data.msg}`)
                             setLoad2(false);
                             //console.log(req?.data)
                         }).catch((e)=>{
                                 //console.log(e);
                                 //setCust("Server offline");
                                 alert(e)
                                 setLoadss(false);
                         })
                     });
                }
             }
           }, 2000);
           },[amt,NetworkName])


    return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1,backgroundColor:colors.lightgrey,}}>
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/>
      <TopBar Title="Buy Crypto" Back={true} onClick={()=>navigation.navigate('TradeScreen')}/>
      <SafeAreaView>
       <ScrollView>

      
       <Space height={13}/>
  
         
         <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<>
             <View style={{
            flexDirection:"row",
            justifyContent:"space-around",
            alignItems:"center",
            backgroundColor:colors.white,
            width:"100%",
            alignSelf:"center",
            height:70,
            borderRadius:8,
            top:-20,
            
            }}>
                     <View style={{
                            
                            backgroundColor:colors.primaryLight,
                            width:30,
                            height:30,
                            borderRadius:100,
                            alignItems:"center",
                            justifyContent:"center",
                            left:10
                            }}>
                   <FontAwesome5 name="coins" size={15} color={colors.primary} />
                     </View> 

                <Pressable 
                onPress={openMenu}
                style={{
                    backgroundColor:colors.line,
                    width:"80%",
                    borderRadius:6,
                    height:50,
                
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>
                
                         <Text style={{left:20,fontFamily:"Poppins-Regular",}}>{NetworkName}</Text>
                       
                        <MaterialIcons name={visible?("keyboard-arrow-down"):("keyboard-arrow-right")} size={24} color="black" style={{right:10}}/>
                        </Pressable>

                        </View>
                        </>}>
         {NetworkName2==null?(<ActivityIndicator/>):(<>
               
               {
                NetworkName2.map(item =>
                <>
                  <Menu.Item onPress={() => {
                    setNetworkN(`${item.coin_name}`)
                    setRate(item.rate)
                    //setNetwork("01")
                    setVisible(false);

                 }} title={`${item.coin_name}`} />
                <Divider />
              
                
                </>
                    )
               }
               </>)}
            
               </Menu>
               <Space height={30}/>
               <View style={{
                    flexDirection:"column",
                    
                    alignItems:"center",
                    backgroundColor:colors.white,
                    width:"95%",
                    alignSelf:"center",
                    height:310,
                    //borderRadius:15,
                    top:-20,
                    position:"relative"
                    }}>
                <Space height={20}/>
              
                <View style={{width:"60%",left:-52}}>
                <Text style={{fontFamily:"Poppins-Regular",color:colors.primary,}}>{rate==null?([]):(`${NetworkName} Rate is : ${rate}/$`)}</Text>
               
                </View>
                <Space height={20}/>
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
                            label={<Text style={{fontFamily:"Poppins-Regular",color:colors.primary}}>You'll be debited</Text>}
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
                            label={<Text style={{fontFamily:"Poppins-Regular",top:-10}}>Enter Amount </Text>}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            keyboardType='number-pad'

                        />
                       </View>  
                    <Pressable style={{backgroundColor:colors.white,borderRadius:100,width:40,height:40,alignItems:"center",justifyContent:"center",}}>
                  
                    <Feather name="dollar-sign" size={17} color={colors.primary} />
                    
                    <Text style={{fontFamily:"DMSans-Bold",fontSize:8,color:colors.secondary}}>USD</Text>
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
             Enter a valid wallet addr to receive your coin
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
                 
                value={Addr}
                onChangeText={Addr=>setAddr(Addr)}
                label={<Text style={{fontFamily:"Poppins-SemiBold",fontSize:13}}>Addr</Text>}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //keyboardType='number-pad'
                placeholder='Wallet address'
                mode='outlined'
                />
            </View>


             <View style={{top:20,left:10,width:"95%"}}>
                         <Btn
                            Text="Continue" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={Network=="0"?(true):(amt=="0"?(true):(Addr=="0"?(true):(Loading2?(true):(false))))}
                            onPress={()=>setShow(true)}
                            loading={Loading2}
                            />

                    </View>
                
            
                </View>
             
               <Space height={300}/>
            </ScrollView>
      
                  <PaymentModal 
                    Show={Modal} 
                    setShow={setShow}
                    Product='Crypto_Purchased'
                    ProductName={NetworkName}
                    ProductImage={ProductImage}
                    Amount={amt2}
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
    </SafeAreaProvider>
    </KeyboardAvoidingView>
    );
};



//make this component available to the app
export default BuyCoin;
