//import liraries
import React, { Component,useContext,useEffect,useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image,} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,NetworkCard,Tpins,PaymentModal } from '../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import Lottie from 'lottie-react-native';
import { Cables } from '../service';
import { StorageGet } from '../../service/storage';
import CableList from '../../utility/CableList';
import { ToastContext } from '../../context/AlertContext';
import { ActivityIndicator } from 'react-native-paper';
// create a component
const Cable = () => {
    const navigation= useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
    const [gloactive,setGlo] = useState(false);
    const [mtnactive,setMtn] = useState(false);
    const [aactive,setA]=useState(false);
    const [mobileactive,setNmobile]=useState(false);
    const [Network,setNetwork]=useState("");
    const [Smartno,setSno]=useState("");
    const [ProductName,setPname]=useState("Dstv");
    const [ProductImage,setPImage]=useState(emages.Dstv);
    const [amt,setAmt]= useState("");
    const [customer,setCust]= useState("");
    const [confirm,setCon]= useState(false);
    const [packageId,setPid]= useState("");
    const [Load,setLoadss]= useState(false);
    const [Loading, setLoad] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);

    
    
       
     const Checkout = () => {
           setShow(false);
           ClosePin(true);
           console.log(Network);
       }
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
        

        if (network=="Dstv"){
            setGlo(true);
            setPname("Dstv");
            setPImage(emages.Dstv);
            setNetwork("01");
        } 
        if (network=="Gotv") {
            setMtn(true);
            setNetwork("02");
            setPname("Gotv");
            setPImage(emages.Gotv);
        }
        if (network=="Startimes"){
            setA(true);
            setNetwork("03");
            setPname("Startimes");
            setPImage(emages.Star);
        }
       
       
    }




    const CompletePayment= async()=>{
        setLoad(true)
        StorageGet("@app_login_code")
        .then((db)=>{
            console.log(db)
            let payload=JSON.stringify({
                appcode:db,
                network:Network,
                smartno:Smartno,
                price:amt,
                packageId:packageId,
               type:"Pay"
               
            });
         console.log(payload);
           Cables(payload)
           .then((req)=>{ 
            
            if(req?.data.status == true) {
                EnableToast(true);
                setEtype("Success");
                setTitle("Transaction Successful!");
                setMsg(`${req?.data.msg}`);
                navigation.navigate('PaymentSuccess',{
                    status:"Successful!",
                    amount:amt,
                    productType:"Cable",
                    ProductImage:ProductImage,
                    ProductStatus:req?.data.msg

                });
               
                console.log(req?.data.status)
            } else {
                EnableToast(true);
                setEtype("Error");
                setTitle("Error Info");
                setMsg(`${req?.data.msg}`);
            
                navigation.navigate('PaymentSuccess',{
                    status:"Failed!",
                    amount:amt,
                    productType:"Cable",
                    ProductImage:ProductImage,
                    ProductStatus:req?.data.msg

                });
           
                console.log(req?.data.status)
                
            }

           });
        }).catch((e)=>{
            setLoad(false)
        });
        
       }

     

   useEffect(()=>{
    if (Smartno.length >= 5){
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
                smartno:Smartno,
                type:"Verify"
            });
            Cables(payload).then((req)=>{
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
   },[Smartno,Network])
//   useEffect(()=>{
//    setAmt("");
//   },[Modal])
   
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/>
     <TopBar Title="Cable subscription" Back={true} onClick={()=>navigation.navigate('Allbills')}/>
      <SafeAreaView>
       <ScrollView>
       <Space height={13}/>
  
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
                  IconSrc={emages.Dstv}
                  onClick={()=>ChooseNetwork("Dstv")}
                  active={gloactive}
                  />
                 <NetworkCard 
                  IconSrc={emages.Gotv}
                  onClick={()=>ChooseNetwork("Gotv")}
                  active={mtnactive}
                  />
                  <NetworkCard 
                  IconSrc={emages.Star}
                  onClick={()=>ChooseNetwork("Startimes")}
                  active={aactive}
                  />
                 
         </View>
         <Space height={20}/>

         <Text style={{
                    fontFamily:"Poppins-Regular",
                    left:20
            }}>
                   SmartCard/IUC Number 

            </Text>
            <Space height={10}/>
            <View style={{
                backgroundColor:colors.line,
                height:70,
                justifyContent:"center",
               
                width:"90%",
                alignSelf:"center"
                }}>
            <TextInput 
                style={{
                backgroundColor:"#FFF",
                borderRadius:4,
                borderColor:"#0F0D23",
                width:'100%',
                
                alignSelf:"center",
                
                
                 }}
                 value={Smartno}
                 onChangeText={Smartno=>setSno(Smartno)}
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
            
            <Space height={0}/>
            
           
           {confirm?( 
                <CableList 
                Network={Network}
                Amt={setAmt}
                packageId={setPid}
                //Load={Load}
                onClick={()=>setShow(true)}
                />
            ):(<></>)}
     </ScrollView>
     { 
                  confirm?(
                  <PaymentModal 
                    Show={Modal} 
                    setShow={setShow}
                    Product='Cable'
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
    </SafeAreaProvider>
    );
};



//make this component available to the app
export default Cable;
