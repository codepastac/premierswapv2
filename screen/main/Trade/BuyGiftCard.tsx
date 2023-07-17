import React, { Component, useContext, useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image,KeyboardAvoidingView,Platform,TouchableOpacity,FlatList} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages,BankModal,Btn,Tpins,Alerts,LoadingScreen, Slash,PaymentModal } from '../../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons,Feather,AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Acc_details, BuyCards, Withdraws } from '../../service';
import { StorageGet } from '../../../service/storage';
import { StateRefresh } from '../../../context/StateRefresh';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { Modalize } from 'react-native-modalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Searchbar ,ActivityIndicator} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import fuzzysort from 'fuzzysort'
import { ToastContext } from '../../../context/AlertContext';

const BuyGiftCard = () => {
  const navigation=useNavigation() as any;
  const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 

  const modalizeRef = useRef<Modalize>(null);
  const [Network,setNetwork]=useState<any>(null);
  const [Card,setCard]=useState<any>(null);
  const [Cards,setCards]=useState<any>(null);
  const [CN,setCN]=useState<any>(null);
  const [CNCODE,setCNCODE]=useState<any>("US");
  const [CNLOGO,setCNLOGO]=useState<any>(emages.USA);
  const [q,SetQ]=useState<any>("");
  const [Loading, setLoad] = useState(false);
  const [Load, setload] = useState(false);
  
  const [countq,SetC]=useState<any>(0);
  const [page,SetPage]=useState<any>(0);
  const [email,setEmail]=useState<any>("");
  
  const [GiftLogo, setGiftLogo] = useState<any>(null);
  const [Product_id, setProduct_id] = useState<any>(null);

  const [GiftName, setGiftName] = useState<any>("");
  const [GiftPrice, setGiftPrice] = useState<any>(null);
  const [GiftCurrency, setGiftCurrency] = useState<any>(null);
  const [Modal, setShow] = useState(false);
  const [Tpin, ClosePin] = useState(false);
  const [Loading3, setLoad3] = useState(false);
  const [amt2,setAmt2]= useState("0");
  const [amt,setAmt]= useState("0");
  const [unitPrice,setUnitPrice]= useState("0");
  const [usdfee,setusdfee]= useState("0");
  const Checkout = () => {
    setShow(false);
    ClosePin(true);
    //console.log(Network);
}

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const data = [
    {
      name: "AppStore & ITunes US",
      logo: "https://cdn.reloadly.com/giftcards/08ed62a9-52d3-47d2-9ad8-ae27d0a3f3a2.png"
    },
    {
      name: "Amazon US",
      logo: "https://cdn.reloadly.com/giftcards/fbef9b57-e0b0-4ead-aee3-fdc2bc80e2db.png"
    }
  ];
  function capitalize(s:any)
  {
      return s[0].toUpperCase() + s.slice(1);
  }
 useEffect(()=>{
  StorageGet("@app_login_code")
  .then((db)=>{
  
  let payload=JSON.stringify({
         appcode:db,
          type:"get"
          
          
      });
      BuyCards(payload).then((req)=>{
        setNetwork(req?.data)
        //console.log(req?.data)
      })
  })
 
 },[]);



 useEffect(()=>{
  setLoad(true)
  StorageGet("@app_login_code")
  .then((db)=>{
  
  let payload=JSON.stringify({
         appcode:db,
          type:"getCard",
          country_code:CNCODE
          
      });
      BuyCards(payload).then((req)=>{
        //setNetwork(req?.data)
        setLoad(false)
        setCard(req?.data);
       // console.log(req?.data)
      })
  })
 
 },[CNCODE]);
 
 useEffect(()=>{
   
  if (q.length==0){
   setCards(null)
   SetC(0);
  } else if(q.length >= 1 ){
    let Result = Card.filter((data:any)=>{
      if(data.name.toUpperCase().includes(q.toUpperCase())){
      return data.name.toUpperCase().includes(q.toUpperCase())
      } 
      
     } )
     //alert(Result.bank_name)
     setCards(Result);
    console.log(Result);
    
  } 
 },[q])

 const PreviewCard=()=>{
  setLoad(true)
  StorageGet("@app_login_code")
  .then((db)=>{
  
  let payload=JSON.stringify({
         appcode:db,
          type:"getProduct",
          product_id:Product_id
          
      });
      BuyCards(payload).then((req)=>{
        //setNetwork(req?.data)
        setLoad(false)

        setGiftPrice(req?.data);
        onOpen()
        SetPage(2);
       
     
       console.log(req?.data)
      })
  })
 }
 
 useEffect(()=>{
  if(Product_id==null){}else{PreviewCard();}
 },[Product_id])
    


      const CompletePayment= async () => {
        StorageGet("@app_login_code")
        .then((db)=>{

          let payload=JSON.stringify({
            appcode:db,
            type:"Complete",
            product_id:Product_id,
            product_name:GiftName,
            amount:amt,
            unit_price:unitPrice,
            usd:usdfee,
            email:email
            
        });
        BuyCards(payload).then((req)=>{
         if(req?.data.status==true){
          EnableToast(true);
          setEtype("Success");
          setTitle("Transaction Successful!");
          setMsg(`${req?.data.msg}`);
           navigation.navigate('PaymentSuccess',{
               status:"Successful!",
               amount:amt2,
               productType:"GIFTCARD_BUY",
               ProductImage:GiftLogo,
               ProductStatus:req?.data.msg
  
           });
          
         }else{
          EnableToast(true);
          setEtype("Error");
          setTitle("Error Info");
          setMsg(`${req?.data.msg}`);
           navigation.navigate('PaymentSuccess',{
               status:"Failed!",
               amount:amt2,
               productType:"GIFTCARD_BUY",
               ProductImage:GiftLogo,
               ProductStatus:req?.data.msg
  
           });
           console.log(req?.data)

  
          }


        })  
        })
        
        
       }


  




 const renderItem2 = ({ item }) => (
    <>
    <Pressable
    onPress={()=>{
      setCN(item.name);
      setCNCODE(item.code);
      setCNLOGO(item.logo)
      modalizeRef.current?.close();
    }}
      style={{width:"80%",height:50,borderRadius:10,margin: 5,alignSelf:"center",alignItems:"center",flexDirection:"row",backgroundColor:colors.primaryLight,}}
    >
    
             <Image 
                //   onLoadStart={()=>setload(true)}
                //   //progressiveRenderingEnabled={true}
                //  onLoad={()=>setload(false)}
                //  onLoadEnd={()=>setload(false)}
                 source={{
                  uri: `${item.logo}`,
                }}
                style={{height:25,width:25,marginLeft:20,borderRadius:100}}
                />  
    
    
     <Text style={{color:colors.dark,fontFamily:"Poppins-Regular",fontSize:14,left:10,}}>{item.name}</Text>
    
       </Pressable>
      
    </>
   
    );

    const renderItem3 = ({ item }) => (
      <>
      <Pressable
       onPress={()=>{
       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
       setAmt2(item.naire);
       setUnitPrice(item.usd);
       setAmt(item.normal_naire);
       setusdfee(`${GiftCurrency}${item.usd}`);
       setShow(true);
      }}
      style={{width:"30%",height:80,borderRadius:10,backgroundColor:colors.swhite,margin:10,alignSelf:"center",flexDirection:"column"}}
      >
           <Text style={{color:colors.dark,fontFamily:"Poppins-Regular",fontSize:14,textAlign:"center",top:10}}>{`${GiftCurrency}${item.usd}`}
          </Text>
        
       <View style={{backgroundColor:colors.primaryLight,position:"absolute",bottom:0,width:"100%",height:"50%",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
       <Text style={{color:colors.dark,fontFamily:"Poppins-Regular",fontSize:12,}}>₦{item.naire}
          </Text> 
       </View>
         </Pressable>
        <Space height={20}/>
      </>
     
      );
  const renderItem = ({ item }) => (
    // onPress={()=>{
    //   SetPage(1);
    //   onOpen()
    // }}
    <LinearGradient
    
      // Background Linear Gradient
        colors={[colors.white,"#b1c3e7"]}
       // style={styles.background}
        style={{width:"48%",height:200,borderRadius:10,margin: 5,alignSelf:"center",alignItems:"center"}}
      >
     <Pressable  
      onPress={()=>{
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
       setProduct_id(item.code);
       setGiftName(item.name)
       setGiftLogo(item.logo);
       setGiftCurrency(item.currency)
      }}
      style={{height:200,borderRadius:10,margin: 5,alignSelf:"center",alignItems:"center",width:"100%"}}>
      <Pressable
        style={{backgroundColor:"#e9e9e9",borderRadius:100,width:40,height:7,alignSelf:"center",top:10}}>
       <Pressable style={{backgroundColor:"#e9e9e9",borderRadius:100,width:15,height:12,position:"absolute",top:-5,alignSelf:"center"}}>

       </Pressable>
        </Pressable>
               <Image 
                   onLoadStart={()=>setload(true)}
                    //progressiveRenderingEnabled={true}
                   onLoad={()=>setload(false)}
                   onLoadEnd={()=>setload(false)}
                   source={{
                    uri: `${item.logo}`,
                  }}
                  style={{height:70,width:70,top:20,borderRadius:100}}
                  />  
                 
       <Pressable style={{backgroundColor:colors.dark,width:"100%",height:80,position:"absolute",bottom:0,borderRadius:0}}>
       <View style={{width:"70%",top:10,left:10}}>
       <Text style={{color:colors.white,fontFamily:"Poppins-Regular",fontSize:12,}}>{item.name}</Text>
      
       </View>
      
       <Text style={{color:colors.grey,fontFamily:"Poppins-Regular",fontSize:11,left:10,position:"absolute",bottom:10}}>{item.country}</Text>
      
         </Pressable>
      </Pressable>
      </LinearGradient>
      
  );


  return (
    
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
   
    <StatusBar/>
    <TopBar Title="Buy GiftCard" Back={true} onClick={()=>navigation.navigate('TradeScreen')}/>
    <SafeAreaView style={{flex:1,}}>
      <View style={{backgroundColor:colors.white,}}>
     <Space height={20}/>
    <View style={{flexDirection:"row",width:"90%",alignSelf:"center",justifyContent:"space-evenly"}}>

    <Searchbar
    style={{width:"76%",backgroundColor:colors.swhite,height:65,}}
      placeholder="Search"
      onChangeText={q=>{
        SetQ(q)
       if(countq.toString().length > q.length){
        let size=countq.toString().length-q.length;
        SetC(size);
       } else {
        SetC(countq+1);
       }
      }}
      value={q}
      mode='bar'
    />
    <Pressable 
    onPress={()=>{
      SetPage(1);
      onOpen()
    }}
    style={{backgroundColor:colors.white,padding:10,borderRadius:100,alignItems:"center",justifyContent:"center",left:10,width:60,flexDirection:"row",gap:5}}>
    <View style={{backgroundColor:colors.swhite,padding:10,}}>
    {CN==null?(
      <Image source={emages.USA} 
      style={{width:30,height:30}}/>
    ):(<Image  source={{
                    uri: `${CNLOGO}`,
                  }} style={{width:30,height:30}}/>)}
    </View>
   
    <AntDesign name="down" size={20} color="black" />
    </Pressable>
    </View>
    
     <Space height={20}/>
     </View>
      {Cards==null?(
        <FlatList style={{margin:5}}
        data={Card}
        numColumns={2}
        keyExtractor={(item) => item.name }
        renderItem={renderItem}
      />
      ):(
        <FlatList style={{margin:5}}
        data={Cards}
        numColumns={2}
        keyExtractor={(item) => item.name }
        renderItem={renderItem}
      />
      )}




   

      <Modalize 
      //snapPoint={600}
       handleStyle={{
        marginTop:30,
        backgroundColor:"#e9e9e9",
        width:80,
      
    }}
    modalStyle={{
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
       // top:0,
    }}
   // alwaysOpen={100}
    scrollViewProps={{showsVerticalScrollIndicator:false}}
      ref={modalizeRef}>
        <Space height={40}/>
        {page==1?(
            <FlatList style={{margin:5}}
            data={Network}
            //numColumns={2}
            keyExtractor={(item) => item.name }
            renderItem={renderItem2}
            ItemSeparatorComponent={
            <View style={{width:"80%",alignSelf:"center"}}>
              
              <Space height={10}/>
              <Slash/>
               <Space height={10}/>
            </View>}
           
          />
        ):(
          <>
           <View style={{justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Image 
                   onLoadStart={()=>setload(true)}
                    //progressiveRenderingEnabled={true}
                   onLoad={()=>setload(false)}
                   onLoadEnd={()=>setload(false)}
                   source={{
                    uri: `${GiftLogo}`,
                  }}
                  style={{height:100,width:100,top:20,borderRadius:100}}
                  />  
                  <Space height={40}/>
                  <View style={{padding:10,backgroundColor:colors.swhite,borderRadius:100}}>
                  <Text style={{color:colors.dark,fontFamily:"Poppins-Regular",fontSize:14,}}>{GiftName}</Text>
      
                  </View>
                  <View style={{marginTop:20,width:"87%",alignSelf:"center"}}>
                       <TextInput 
                            style={{
                            backgroundColor:colors.white,
                            borderRadius:1,
                            borderColor:"#0F0D23",
                            width:'100%',
                            
                        
                            height:50,
                         
                             top:-8,
                            
                             fontFamily:"Poppins-Bold",
                             
                            }}
                            value={email}
                            onChangeText={email=>setEmail(email)}
                            label={"Receiver Email Address"}
                            activeUnderlineColor={colors.primary}
                            underlineColor={colors.secondary}
                            placeholder='Enter email to receive your giftcard code'
                            keyboardType='email-address'
                            //disabled={true}
                           mode='outlined'
                        />
                       </View>
          
                  <Space height={20}/>

              

                  </View>
                   <FlatList style={{margin:5}}
                   data={GiftPrice}
                   numColumns={2}
                   keyExtractor={(item) => item.usd }
                   renderItem={renderItem3}
                   ItemSeparatorComponent={
                   <View style={{width:"80%",alignSelf:"center"}}>
                     
                     <Space height={10}/>
                     <Slash/>
                      <Space height={10}/>
                   </View>
                     }
                  
                      />  
       
          </>
          )}
 
                  <Space height={50}/>
                  </Modalize>
                  <PaymentModal 
                    Show={Modal} 
                    setShow={setShow}
                    Product='GIFTCARD_BUY'
                    ProductName={GiftName.substring(0, 4) + "..."}
                    ProductImage={GiftLogo}
                    Amount={amt2}
                    onClick={()=>Checkout()}
                    />


                  <Tpins 
                  Show={Tpin}
                  setShow={ClosePin}
                  PStatus={setLoad3}
                  onClick={()=>CompletePayment()}
                  />
                 
      <LoadingScreen Show={Loading} noLogo={true}/>
    </SafeAreaView>
  
    </SafeAreaProvider>
    );
};


//make this component available to the app
export default BuyGiftCard;
