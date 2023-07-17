//import liraries
import React, { Component,useContext,useEffect,useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image, ActivityIndicator} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,NetworkCard,Tpins,PaymentModal,Btn } from '../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import Lottie from 'lottie-react-native';
import { Educations } from '../service';
import { StorageGet } from '../../service/storage';
import { ToastContext } from '../../context/AlertContext';
// create a component
const Education = () => {
    const navigation= useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);

    const [gloactive,setGlo] =useState(true);
    const [mtnactive,setMtn]=useState(false);
    const [aactive,setA]=useState(false);
    const [amt,setAmt]= useState("0");
    const [ProductName,setPname]=useState(null);
    const [ProductImage,setPImage]=useState(emages.Waec_logo);
    const [customer,setCust]= useState("");
    const [confirm,setCon]= useState(false);
    const [email,setemail]= useState("");
    const [Load,setLoadss]= useState(false);
    const [Loading, setLoad] = useState(false);
    const [Modal, setShow] = useState(false);
    const [Tpin, ClosePin] = useState(false);


    const Checkout = () => {
      setShow(false);
      ClosePin(true);
      //console.log(Network);
  }

const CompletePayment= async()=>{
   setLoad(true)
   StorageGet("@app_login_code")
   .then((db)=>{
       console.log(db)
       let payload=JSON.stringify({
                  appcode:db,
                  email:email,
                  price:amt,
                  type:"Pay"
          
       });
         console.log(payload);
            Educations(payload)
            .then((req)=>{ 
       
       if(req?.data.status == true) {
        EnableToast(true);
        setEtype("Success");
        setTitle("Transaction Successful!");
        setMsg(`${req?.data.msg}`);
           navigation.navigate('PaymentSuccess',{
               status:"Successful!",
               amount:amt,
               productType:"Education",
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
               productType:"Education",
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
      
         if(ProductName == null){
            StorageGet("@app_login_code")
      .then((db)=>{
          console.log(db)
          setAmt("loading.....");
          let payload=JSON.stringify({
              appcode:db,
              type:"Package"
             
          });
          Educations(payload).then((req)=>{
             if(req?.data.status==true){
               setAmt(`${req?.data.plan_amt}`);
               setPname(req?.data.plan_name);
               console.log(req?.data.plan_amt)
               setCon(true);
             } else {
               setAmt(`${req?.data.msg}`);
             }
          })
         });
         }

         },[])
    
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/>
     <TopBar Title="Buy Pin" Back={true} onClick={()=>navigation.navigate('Allbills')}/>
      <SafeAreaView>
       <ScrollView>
       <Space height={13}/>
  
           <View style={{
            flexDirection:"row",
           
            alignItems:"center",
            backgroundColor:colors.white,
            width:"100%",
            alignSelf:"center",
            height:100,
            borderRadius:8,
            top:-20,
            justifyContent:"space-around"
            }}>
                <NetworkCard 
                  IconSrc={emages.Waec_logo}
                  //onClick={()=>ChooseNetwork("Dstv")}
                  active={gloactive}
                  />
                <TextInput 
                style={{
                backgroundColor:"#FFF",
                borderRadius:4,
                borderColor:"#0F0D23",
                width:"72%",
                alignSelf:"center",
                fontSize:15,
                fontFamily:"Poppins-Bold",
                height:55
                 }}
                 value={email}
                onChangeText={email=>setemail(email)}
                label="@"
                placeholder='Enter email address to receive your pin'
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                //keyboardType='number-pad'
                 mode="outlined"
                
                />
            
                 
         </View>
       

       
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
                            borderWidth:1,
                            borderBottomColor:colors.white,
                            borderEndColor:colors.line,
                           borderRightColor:colors.line,
                           borderTopColor:colors.line
                           
                        }}
                            value={amt}
                            //onChangeText={amt=>setAmt(amt)}
                            label={""}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            keyboardType='number-pad'
                            disabled={true}
                        />
                       </View>
                    <View style={{top:20,left:5}}>
                         <Btn
                            Text="Pay" 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={email.length==0?(true):(amt.length==0?(true):(false))}
                            onPress={()=> setShow(true)}
                             />
                        </View>
                    </View>
        <Space height={100}/>

     </ScrollView>
     { 
                  confirm?(
                  <PaymentModal 
                    Show={Modal} 
                    setShow={setShow}
                    Product='Education'
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
export default Education;
