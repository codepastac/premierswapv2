import { View, Text,SafeAreaView, ScrollView,Pressable,Image,FlatList,RefreshControl} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { colors,HisTable,Space,TopBar ,emages, Slash,LoadingScreen} from '../../../utility';
import {  SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Avatar, Card, Divider} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { StatusBar } from 'expo-status-bar';
import { StorageGet } from '../../../service/storage';
import { Acc_details, FetchBalance } from '../../service';
//import SkeletonContent from 'react-native-skeleton-content';
//import SkeletonContent from "react-native-skeleton-content";
//import { Skeleton } from '@rneui/themed';
//import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { MaterialIcons,MaterialCommunityIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import { StateRefresh } from '../../../context/StateRefresh';

const NotificationScreen = () => {
  const navigation=useNavigation() as any;
  const {refresh,setRefresh}=useContext(StateRefresh);
  const [username,setUsername]= useState(null);
  const [Loading,setLoad]= useState(true);
  const [Load1,setLoad1]= useState(false);
  const [Load2,setLoad2]= useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [resel,setReseller]= useState(false);
  const [acct,setAcct]= useState(false);
  const [bvn,setBvn]= useState(false);
  const [His1,setHis1]= useState(true);
  const [His2,setHis2]= useState(false);
  const [List1,setList1]= useState(null);
  const [List2,setList2]= useState(null);
  const [TotalIn,SetIn]= useState("0.00");
  const [TotalOut,setOut]= useState("0.00");
  
  const FetchShot=()=>{
    setLoad1(true)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    
      StorageGet("@app_login_code")
      .then((db)=>{
          console.log(db)
          let payload=JSON.stringify({
            appcode:db,
            type:"history_full",
            type2:His1?("debit"):("credit"),

        });
          //console.log(payload);
          Acc_details(payload).then((req)=>{
            setLoad1(false);
            if (req?.data == false){
              setLoad1(false);
              // setList1(null);
              // setList2(null);
             } else {
              if(His1){
           
                setList1(req?.data);
              } else {
                
                setList2(req?.data);
              }
             }
         
            //console.log(req?.data)
          });
        }).catch((e)=>{
          console.log(e);
        })
    
  }
 

  const GetTotal=()=>{
     StorageGet("@app_login_code")
      .then((db)=>{
          console.log(db)
          let payload=JSON.stringify({
            appcode:db,
            type:"total_trx",
            //type2:His1?("debit"):("credit"),

        });
          //console.log(payload);
          Acc_details(payload).then((req)=>{
           SetIn(req?.data.in);
           setOut(req?.data.out)
            console.log(req?.data)
          });
        }).catch((e)=>{
          console.log(e);
        })
    
  }
 
  useEffect(()=>{
   //if(List1==null){
    FetchShot();
    //GetTotal();
   //}
  },[])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      FetchShot();
      setRefreshing(false);
    }, 1000);
  }, []);
  const Spent = () =>{
    if (List1 == null){
      return(
        <Text  style={{
          color:colors.grey,
           fontFamily:"DMSans-Medium",
          fontSize:16,
          textAlign:"center"
        }}>{`Your transaction history is empty`}</Text>
        );
    } else {
        return(
     
      <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={List1}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
     
      renderItem={({ item }) => (
       <View>
          
          <View style={{flexDirection:"column",alignItems:"center",width:"90%",alignSelf:"center",
             
            }}>
              
            <View style={{
                flexDirection:"row",justifyContent:"space-between",
              
             }}>
               
            <Pressable 
            
            style={{
               flexDirection:"row",
               justifyContent:"space-evenly",
                padding: 12,
                width:"100%"
            }}>
                <View style={{flexDirection:"column",width:"80%",backgroundColor:colors.white}}>
                <Text  style={{
                 color:"black",
                 fontFamily:"Poppins-Regular",
                 fontWeight:"bold",
                 fontSize:13,
               }}>{item.activity}</Text>
                
                <Text  
              style={{
               color:colors.grey,
               fontFamily:"DMSans-Medium",
               fontSize:12,
               top:10
               }}>{item.time}</Text>
                </View>
                
               <View style={{flex:1,alignItems:"flex-end",left:40}}>
               <View style={{backgroundColor:colors.white,alignItems:"center",justifyContent:"center",width:100,height:60,top:-3,flexDirection:"column"}}>
              <Text style={{
                 color:colors.secondary,
                 fontFamily:"DMSans-Bold",
                 fontSize:14,
               }}>{item.type2=="credit"?(`+ ₦${item.amount}`):(`- ₦${item.amount}`)}</Text>
               <Space height={20}/>
                <Text style={{
                 color:item.status=="2"?("green"):(item.status=="Pending"?("orange"):("red")),
                 fontFamily:"DMSans-Bold",
                 fontSize:14,
               }}>{item.status=="2"?("Sucessful"):(item.status)}</Text>
              </View>
              </View>
             
            </Pressable>
          
               
               
               
        </View>
          </View>
        
       </View>
      )}
      ItemSeparatorComponent={<View>
        <Space height={40}/>
        <Slash/>
         <Space height={20}/>
      </View>}
     
      initialNumToRender={4}
      removeClippedSubviews={true}
      />
        
         
        );
            
    }
}





const IN= () =>{
  if (List2== null){
    return(
      <Text  style={{
        color:colors.grey,
         fontFamily:"DMSans-Medium",
        fontSize:16,
        textAlign:"center"
      }}>{`Your transaction history is empty`}</Text>
      );
  } else {
      return(
      <FlatList
        data={List2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{}}> 
         
           <View style={{flexDirection:"column",alignItems:"center",width:"90%",alignSelf:"center",
             
          }}>
            
          <View style={{
              flexDirection:"row",justifyContent:"space-between",
            
           }}>
             
          <Pressable 
          
          style={{
             flexDirection:"row",
             justifyContent:"space-around"
              
          }}>
           <View style={{
                  
                  backgroundColor:colors.primary,
                  width:30,
                  height:30,
                  borderRadius:100,
                  alignItems:"center",
                  justifyContent:"center",
                  left:-45,
               
                  }}>
               {item.type=="airtime"?( 
               <Ionicons name="phone-portrait" size={15} color={colors.white} />):(
                 <>
                 {item.type=="data"?(
                   <MaterialIcons name="network-wifi" size={15} color={colors.white} />
                 ):(
                   <>
                   {item.type=="cable"?(
                   <Image source={emages.icon} style={{tintColor:colors.white,width:15,height:16}}/>
                   ):(
                   <>
                    <Image source={emages.icon} style={{tintColor:colors.white,width:15,height:16}}/>
                 
                   </>
                 )
                 }
                   </>
                 )
                 }
                 </>
               )}
             </View>
              <View style={{flexDirection:"column",width:"70%",left:-40,}}>
              <Text  style={{
               color:colors.secondary,
               fontFamily:"DMSans-Bold",
               fontSize:13,
             }}>{item.activity}</Text>
              <Text  
             style={{
             color:colors.grey,
             fontFamily:"DMSans-Medium",
             fontSize:12,
             }}>{item.time}</Text>
              </View>
              
             <View style={{flex:1,alignItems:"flex-end",left:50}}>
             <View style={{backgroundColor:colors.white,borderRadius:100,alignItems:"center",justifyContent:"center",width:100,height:40,top:-3}}>
            <Text style={{
               color:colors.secondary,
               fontFamily:"DMSans-Bold",
               fontSize:14,
             }}>+₦{item.amount}</Text>
            </View>
            </View>
           
          </Pressable>
        
             <Space height={90}/>
             
             
            </View>
              
            </View>

           </View>

      )}
      ItemSeparatorComponent={<View>
        <Space height={40}/>
        <Slash/>
         <Space height={20}/>
      </View>}
      />
        
         
        );
            
  }
}
 
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.white,}}>
      <StatusBar/>
     <TopBar Title="Transaction History" Back={false} onClick={()=>navigation.navigate('HomeScreen')}/>
      <SafeAreaView>
        
     
                 <Space height={0}/>
                  <View style={{backgroundColor:colors.white,width:"110%",height:40,borderRadius:10,left:-20,flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                  
                  {/* <Pressable 
                  style={{
                    backgroundColor:His1?(colors.lightgrey):(colors.white),
                    height:30,
                    width:150,
                    borderRadius:5,
                    justifyContent:"center"
                  }}
                  onPress={()=>{
                    setHis2(false)
                    setHis1(true)
                    FetchShot()
                  }}>
                  <Text style={{color:His1?(colors.primary):(colors.grey),
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                    textAlign:"center"
                  
                  }}>Spent</Text>
                  </Pressable>
                  <Pressable 
                  style={{
                    backgroundColor:His2?(colors.lightgrey):(colors.white),
                    height:30,
                    width:150,
                    borderRadius:5,
                    justifyContent:"center"
                  }}
                  onPress={()=>{
                    setHis1(false)
                    setHis2(true)
                    FetchShot()
                  }}>
                  <Text style={{color:His2?(colors.primary):(colors.grey),
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                  textAlign:"center"
                  
                  }}>Recieved</Text>
                  </Pressable>
                 
                   */}

                
                  </View>
                  {Load1?([]):(
                  <View>
                    <View style={{flexDirection:"row",justifyContent:"space-around",width:"120%",alignSelf:"center"}}>
                    <Text style={{fontFamily:"Poppins-Regular",fontSize:15}}>Statement Of Account</Text>
                     <Pressable
                     onPress={()=>{
                      navigation.navigate('EStatement')
                     }}
                     >
                     <MaterialIcons name="cloud-download" size={20} color={colors.primary} />
                     </Pressable>
                    </View>
                    <Space height={10}/>
                      
                 
                  <Slash/>
        
                  <Space height={20}/>
                  <View style={{alignSelf:"center",width:"95%"}}>
                  
                    <View>
                       {His1?(
                      <>{Load1?(
                        <ActivityIndicator/>
                      
                      ):(<Spent/>)}</>
                    ):(
                      <>{Load1?(<ActivityIndicator/>):(<IN/>)}</>
                    ) }
                   <Space height={40}/>
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                  textAlign:"center"
                  
                  }}>-End-</Text>
                    </View>
                    
                 
                  </View>
                  </View>
                   )}
                  <Space height={200}/>
                  
    
                  <LoadingScreen Show={Load1} noLogo={true}/>


     
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default NotificationScreen