//import liraries
import React, { Component,useContext,useEffect,useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image,KeyboardAvoidingView,Platform} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,NetworkCard,Tpins,PaymentModal,Btn} from '../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import Lottie from 'lottie-react-native';
import { Electricity} from '../service';
import { StorageGet } from '../../service/storage';
import CableList from '../../utility/CableList';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons, } from '@expo/vector-icons';
import { Menu, Button,Divider} from 'react-native-paper';
import { ToastContext } from '../../context/AlertContext';
import { ActivityIndicator } from 'react-native-paper';

// create a component
const Elec = () => {
   const navigation = useNavigation() as any;
   const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
    const [gloactive,setGlo] =useState(false);
    const [mtnactive,setMtn]=useState(false);
    const [aactive,setA]=useState(false);
    const [mobileactive,setNmobile]=useState(false);
    const [Network,setNetwork]=useState("");
    const [NetworkName,setNetworkN]=useState("Select Electricity Company");
    const [Smartno,setSno]=useState("");
    const [ProductName,setPname]=useState("Dstv");
    const [ProductImage,setPImage]=useState(emages.icon);
    const [amt,setAmt]= useState("");
    const [customer,setCust]= useState("");
    const [confirm,setCon]= useState(false);
    const [packageId,setPid]= useState("");
    const [Load,setLoadss]= useState(false);
    const [Loading, setLoad] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [Meter,setMeter]=useState("Select meter type");
    const [Meterid,setMeterid]=useState("");
    const openMenu = () => setVisible(true);
   
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
                        network:Network,
                        meterno:Meterno,
                        metertype:Meterid,
                        price:amt,
                        type:"Pay"
                
             });
          console.log(payload);
            Electricity(payload)
            .then((req)=>{ 
             
             if(req?.data.status == true) {
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                 navigation.navigate('PaymentSuccess',{
                     status:"Successful!",
                     amount:amt,
                     productType:"Electricity",
                     ProductImage:ProductImage,
                     ProductStatus:req?.data.msg
 
                 });
                
                 console.log(req?.data)
             } else {
                EnableToast(true);
                setEtype("Error");
                setTitle("Error Info");
                setMsg(`${req?.data.msg}`);
             
                 navigation.navigate('PaymentSuccess',{
                     status:"Failed!",
                     amount:amt,
                     productType:"Electricity",
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
 
      
 


        useEffect(()=>{
            if (Meterno.length >= 4){
                setLoadss(true);
               if(confirm){
                setCon(false);
               }
                StorageGet("@app_login_code")
                .then((db)=>{
                    console.log(db)
                    let payload=JSON.stringify({
                        appcode:db,
                        network:Network,
                        meterno:Meterno,
                        metertype:Meterid,
                        //amt:5000,
                        type:"Verify"
                    });
                    Electricity(payload).then((req)=>{
                        setLoadss(false);
                        setCust(req?.data.msg);
                        if (req?.data.status==true){
                            setCon(true);
                        }
                        console.log(req?.data)
                    }).catch((e)=>{
                            console.log(e);
                            setCust("Server offline");
                            alert(e)
                            setLoadss(false);
                    })
                });
            }
           },[Meterno,Network,Meterid])
        




    return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1,backgroundColor:colors.lightgrey,}}>
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/>
      <TopBar Title="Electricity subscription" Back={true} onClick={()=>navigation.navigate('Allbills')}/>
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
                     <Ionicons name="bulb-sharp" size={15} color={colors.primary} />
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
                <Menu.Item onPress={() => {
                    setNetworkN("Eko Electricity - EKEDC(PHCN)")
                    setNetwork("01")
                    setVisible(false);

                 }} title="Eko Electricity - EKEDC(PHCN)" />
                <Divider />
                <Menu.Item onPress={() => {
                    setNetworkN("Ikeja Electricity - IKEDC(PHCN)")
                    setNetwork("02")
                    setVisible(false);
                 }} title="Ikeja Electricity - IKEDC(PHCN)" />
                <Divider />
                <Menu.Item onPress={() => {
                       setNetworkN("PortHarcourt Electricity - PHEDC")
                       setNetwork("03")
                       setVisible(false);
                 }} title="PortHarcourt Electricity - PHEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                     setNetworkN("Kaduna Electricity - KAEDC")
                     setNetwork("04")
                     setVisible(false);
                 }} title="Kaduna Electricity - KAEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                     setNetworkN("Abuja Electricity - AEDC")
                     setNetwork("05")
                     setVisible(false);
                 }} title="Abuja Electricity - AEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                      setNetworkN("Ibadan Electricity - IBEDC")
                      setNetwork("06")
                      setVisible(false);
                 }} title="Ibadan Electricity - IBEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                      setNetworkN("Kano Electricity - KEDC")
                      setNetwork("07")
                      setVisible(false);
                 }} title="Kano Electricity - KEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                    setNetworkN("Jos Electricity - JEDC")
                    setNetwork("08")
                    setVisible(false);
                 }} title="Jos Electricity - JEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                     setNetworkN("Enugu Electricity - EEDC")
                     setNetwork("09")
                     setVisible(false);
                 }} title="Enugu Electricity - EEDC" />
                <Divider />
                <Menu.Item onPress={() => {
                      setNetworkN("Benin Electricity - BEDC")
                      setNetwork("10")
                      setVisible(false);
                 }} title="Benin Electricity - BEDC" />
                </Menu>
            
       
         
                <Space height={10}/>

            <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                    Meter Type

            </Text>
            <Menu
            visible={visible2}
            onDismiss={closeMenu2}
            anchor={<>
             <Space height={20}/>
            
               <View style={{width:"90%",alignSelf:"center"}}>
               <Pressable 
                onPress={openMenu2}
                style={{
                    backgroundColor:colors.white,
                    width:"100%",
                    borderRadius:0,
                    height:50,
                    
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>
                
                         <Text style={{left:20,fontFamily:"Poppins-Regular",}}>{Meter}</Text>
                       
                        <MaterialIcons name={visible2?("keyboard-arrow-down"):("keyboard-arrow-right")} size={24} color="black" style={{right:0}}/>
                        </Pressable>

               </View>
                       
                        </>}>
                <Menu.Item onPress={() => {
                    setMeter("PREPAID")
                    setMeterid("01")
                    setVisible2(false);

                 }} title="PREPAID" />
                <Divider />
                <Menu.Item onPress={() => {
                   setMeter("POSTPAID")
                   setMeterid("01")
                   setVisible2(false);
                 }} title="POSTPAID" />
                <Divider />
                </Menu>
            <Space height={20}/>
             <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                  Meter Number/Account Number

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
                 value={Meterno}
                 onChangeText={Meterno=>setMeterno(Meterno)}
                //label={<Text style={{fontFamily:"Poppins-SemiBold",fontSize:13}}>+234</Text>}
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //keyboardType='number-pad'
                 mode="outlined"
                 //right={<TextInput.Icon icon="eye" />}
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
            
            
                <Space height={20}/>
                <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                   Enter your amount 
            </Text>
            <Space height={40}/>
                <View style={{
                    backgroundColor:"white",
                height:75,
               
               
                width:"95%",
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
                            onChangeText={amt=>setAmt(amt)}
                            label={""}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            keyboardType='number-pad'

                        />
                       </View>
                    <View style={{top:20,left:5}}>
                         <Btn
                            Text="Pay" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={Meterno.length==0?(true):(amt.length==0?(true):(confirm==true?(false):(true)))}
                            onPress={()=> setShow(true)}
                             />
                        </View>
                    </View>
                
                <Space height={160}/>
            </ScrollView>
       { 
                  confirm?(
                  <PaymentModal 
                    Show={Modal} 
                    setShow={setShow}
                    Product='Electricity'
                    ProductName={NetworkName.substring(30, 20) + "..."}
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
    </SafeAreaProvider>
    </KeyboardAvoidingView>
    );
};



//make this component available to the app
export default Elec;
