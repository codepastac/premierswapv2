import { View, Text,ScrollView,ImageBackground,Image, Pressable, Dimensions,Platform,StatusBar} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Space, colors, emages,StatusBars, ServiceCard, BalanceCard,Banners,ServiceCard2, Tpins,LoadingScreen,Btn } from '../../../utility/index'
import { ActivityIndicator, Avatar, Card} from 'react-native-paper';
import {  SafeAreaProvider, useSafeAreaInsets,SafeAreaView} from 'react-native-safe-area-context';
import UserCard from '../../../utility/UserCard';
import {Slash} from '../../../utility/index';
import { StorageGet } from '../../../service/storage';
import { Acc_details, FetchBalance } from '../../service';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { MaterialIcons,MaterialCommunityIcons,AntDesign,Ionicons,Feather, } from '@expo/vector-icons';
import { StateRefresh } from '../../../context/StateRefresh';
import { RefreshControl } from 'react-native';
const HomeScreen = () => {

      const {refresh,setRefresh}=useContext(StateRefresh);
      const navigation=useNavigation() as any;
      const [username,setUsername]= useState(null);
      const [Loading,setLoad]= useState(true);
      const [Load1,setLoad1]= useState(false);
      const [Load2,setLoad2]= useState(false);
      //const [refreshing,setRe]= useState(false);
      const [resel,setReseller]= useState(false);
      const [acct,setAcct]= useState(false);
      const [bvn,setBvn]= useState(false);
      const [His1,setHis1]= useState(true);
      const [His2,setHis2]= useState(false);
      const [List1,setList1]= useState(null);
      const [List2,setList2]= useState(null);
      const [pic,setpic]= useState("");
      const [Menu,setMenu]= useState(false);
      const [refreshing, setRefreshing] = useState(false);
      const FetchShot=()=>{
        if(His1){
          setLoad1(true)
        } else {
          setLoad2(true)
        }
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        
          StorageGet("@app_login_code")
          .then((db)=>{
              console.log(db)
              let payload=JSON.stringify({
                appcode:db,
                type:"history",
                type2:His1?("debit"):("credit"),

            });
              console.log(payload);
              Acc_details(payload).then((req)=>{
             if (req?.data == false){
              setLoad1(false);
              //setList1(null);
             } else {
              if(His1){
                setLoad1(false);
                setList1(req?.data);
              } else {
                setLoad2(false);
                setList2(req?.data);
              }
             }
                console.log(req?.data)
              });
            }).catch((e)=>{
              console.log(e);
            })
        
      }

     

    useEffect(()=>{
      StorageGet("@app_user_details").then((db)=>{
        let get=JSON.parse(db);
      setUsername(get.username);
      setReseller(get.reseller);
      setTimeout(() => {
        setLoad(false);
      }, 4000);
        });
    },[refresh]);
    useEffect(()=>{
      
        StorageGet("@app_login_code")
        .then((db)=>{
            console.log(db)
            let payload=JSON.stringify({
                appcode:db,
                type:"verify"
            });
            console.log(payload);
            Acc_details(payload).then((req)=>{
              setAcct(req?.data.acct);
              setBvn(req?.data.bvn);
              setpic(req?.data.pic)
              console.log(pic)
            });
          }).catch((e)=>{
            console.log(e);
          })
      
    },[refresh])

    useEffect(()=>{
      setTimeout(() => {
        FetchShot();
      },1000);
    },[refresh])


    const Spent = () =>{
      if (List1 == null){
          return(
          <Text  style={{
            color:colors.grey,
             fontFamily:"DMSans-Medium",
            fontSize:16,
          }}>{`Your transaction history is empty`}</Text>
          );
      } else {
          return(
              <View style={{}}> 
              {List1.map(item=>(
                <View style={{flexDirection:"column",alignItems:"center",width:"100%",alignSelf:"center",
             
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
                  
                   <View style={{flexDirection:"column",width:"70%",left:0,}}>
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
                   
                  <View style={{flex:1,alignItems:"flex-end",left:30}}>
                  <View style={{backgroundColor:colors.swhite,borderRadius:100,alignItems:"center",justifyContent:"center",width:100,height:40,top:-3}}>
                 <Text style={{
                    color:colors.secondary,
                    fontFamily:"DMSans-Bold",
                    fontSize:14,
                  }}>- ₦{item.amount}</Text>
                 </View>
                 </View>
                
                 </Pressable>
                 
                    
             </View>
               
             </View>
  
              ))}
              </View>
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
        }}>{`Your transaction history is empty`}</Text>
        );
    } else {
        return(
            <View style={{}}> 
            {List2.map(item=>(
             <View style={{flexDirection:"column",alignItems:"center",width:"100%",alignSelf:"center",
             
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
                
                 <View style={{flexDirection:"column",width:"70%",left:0,}}>
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
                 
                <View style={{flex:1,alignItems:"flex-end",left:30}}>
                <View style={{backgroundColor:colors.swhite,borderRadius:100,alignItems:"center",justifyContent:"center",width:100,height:40,top:-3}}>
               <Text style={{
                  color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                }}>+ ₦{item.amount}</Text>
               </View>
               </View>
              
               </Pressable>
               
                  
           </View>
             
           </View>

            ))}
            </View>
            );
    }
}


const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefresh(refresh+1)
    setRefreshing(false);
  }, 2000);
}, []);
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite}}>
   
     <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 25 : 0}}>
     
     <Space height={5}/>
              <UserCard username={`${username}`} reseller={resel} pic={pic}/>
              <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <BalanceCard bvn={bvn} refresh={refresh}/>
              <Space height={30}/>
              
          <View style={{width:"80%",alignSelf:"center"}}>


          <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
              <Pressable 
              onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                navigation.navigate('AirtimeScreen')}}
               style={{flexDirection:"column",alignItems:"center"}}>
              <View style={{backgroundColor:colors.primaryLight,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
              <Image source={emages.Internet} style={{width:20,height:20}}/>
                       
              </View> 
              <Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>Airtime</Text>
              </Pressable>
             
              <Pressable 
                onPress={()=>{
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  navigation.navigate('DataScreen')}}
               style={{flexDirection:"column",alignItems:"center"}}>
               <View style={{backgroundColor:colors.primaryLight,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
              <Image source={emages.Wifi} style={{width:20,height:20}}/>
                       
              </View> 
              <Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>Data</Text>
              </Pressable>

              <Pressable 
               onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                navigation.navigate('Allbills')}}
               style={{flexDirection:"column",alignItems:"center"}}>
                 <View style={{backgroundColor:colors.primaryLight,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
              <Image source={emages.Wallet} style={{width:20,height:20}}/>
                       
              </View> 
              <Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>Bills</Text>
              </Pressable>

              <Pressable 
              onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                setMenu(!Menu)
              }}
              style={{flexDirection:"column",alignItems:"center"}}>
              <View style={{backgroundColor:colors.primaryLight,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
              
              {Menu?(<AntDesign name="closecircle" size={19} color={colors.primary}/>)
              :(<MaterialIcons name="dashboard-customize" size={19} color={colors.primary} />)}
              </View> 
              
              {Menu?(<Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>Close</Text>)
              :(<Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>More</Text>)}
             
              </Pressable>


              </View>
              <Space height={40}/>




              {Menu?(
              <>
              <View style={{flexDirection:"row",justifyContent:"space-between",width:"44%",left:-5}}>
              
              <Pressable 
              onPress={()=>navigation.navigate('TransferScreen')}
               style={{flexDirection:"column",alignItems:"center"}}>
              <View style={{backgroundColor:colors.primaryLight,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
              <MaterialCommunityIcons name="bank-transfer" size={26} color={colors.primary} style={{left:3}}/>
                       
              </View> 
              <Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>Withdraw</Text>
              </Pressable>

              <Pressable 
              onPress={()=>navigation.navigate('TradeScreen')}
               style={{flexDirection:"column",alignItems:"center"}}>
              <View style={{backgroundColor:colors.primaryLight,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
              <Image source={emages.Convert} style={{width:20,height:20}}/>
                       
              </View> 
              <Text style={{fontFamily:"Poppins-Regular",fontSize:12}}>Trade</Text>
              </Pressable>

              


              </View>

              
              <Space height={40}/>

              </>
              ):(
                <></>
              )


              }
                  
              




                 <Text 
                  style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:16,
                  left:-3
                   
                   
                  }}>Complete setup</Text>
                    <Space height={10}/>
                  <Text 
                  style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:-3
                   
                   
                  }}>Get the most out of your Premierswap account</Text>
                  <Space height={30}/>
                  <Pressable 
                  onPress={
                   ()=>{
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                      navigation.navigate('AddBvn')
                    
                    }}
                  style={{backgroundColor:colors.white,width:"110%",height:80,borderRadius:10,left:-20,flexDirection:"row",alignItems:"center"}}>
                  <Image source={emages.Bvn} style={{width:40,height:40,left:15}}/>
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Medium",
                  fontSize:14,
                  left:25}}>Add BVN</Text>
                  <View style={{flex:1,alignItems:"flex-end",left:-15}}>
                  <View style={{backgroundColor:colors.line,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
                  <Feather name={bvn?("check-circle"):("alert-triangle")} size={20} color={bvn?(colors.primary):("red")} />
                  
                 </View> 
                  </View>
                  </Pressable>



                  <Space height={30}/>
                  {acct?([]):(
                    <>
                      <Pressable 
                    onPress={
                      acct?(()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)):(
                        bvn?(
                          ()=>{
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            navigation.navigate('AddMoney')
                          }
                        ):(
                          ()=>{
                            
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            //navigation.navigate('AddBvn')
                            navigation.navigate('AddMoney')
                          }
                        )
                      )
                      }
                   style={{backgroundColor:colors.white,width:"110%",height:80,borderRadius:10,left:-20,flexDirection:"row",alignItems:"center"}}>
                    <Image source={emages.Adda} style={{width:40,height:40,left:15}}/>
                    <Text style={{color:colors.grey,
                    fontFamily:"DMSans-Medium",
                    fontSize:14,
                    left:25}}>Add An Account Number</Text>
                    <View style={{flex:1,alignItems:"flex-end",left:-15}}>
                    <View style={{backgroundColor:colors.line,borderRadius:100,alignItems:"center",justifyContent:"center",width:40,height:40,top:-3}}>
                    <Feather name={acct?("check-circle"):("alert-triangle")} size={20} color={bvn?(colors.primary):("red")} />
                    </View>     
                     </View>
                     
                    </Pressable>
                    <Space height={20}/>
                  
                    </>
                  )}
                  
                  <Space height={10}/>

                   <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                  <Text 
                  style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:16,
                  left:-10
                   
                   
                  }}>Recent Activities</Text>
                   
                  </View>
                  
                  <Space height={30}/>
                  <View style={{backgroundColor:colors.white,width:"110%",height:80,borderRadius:10,left:-20,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                  
                  <Pressable onPress={()=>{
                    setHis1(true)
                    setHis2(false)
                    FetchShot()
                  }}>
                  <Text style={{color:His1?(colors.primary):(colors.grey),
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
               
                  
                  }}>Spent</Text>
                  </Pressable>
                  <Pressable onPress={()=>{
                    setHis1(false)
                    setHis2(true)
                    FetchShot()
                  }}>
                  <Text style={{color:His2?(colors.primary):(colors.grey),
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                 
                  
                  }}>Recieved</Text>
                  </Pressable>
                 
                  </View>
                  <Space height={30}/>

                  <View style={{alignSelf:"center"}}>
                    {His1?(
                      <>{Load1?(<ActivityIndicator/>):(<Spent/>)}</>
                    ):(
                      <>{Load2?(<ActivityIndicator/>):(<IN/>)}</>
                    ) }
                  </View>
            
                  <Space height={30}/> 
                  <Text style={{color:colors.grey,
                  fontFamily:"DMSans-Bold",
                  fontSize:14,
                  textAlign:"center"
                  
                  }}>-End-</Text>

                  <Space height={30}/>
                  <Pressable 
                  onPress={()=>{
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    navigation.navigate('Upgrade')
                  }}
                   >
                  <Image source={emages.Banner1} style={{borderRadius:20,height:180,alignSelf:"center",width:"100%",}}/>
                  <Text style={{color:colors.secondary,
                  fontFamily:"DMSans-Bold",
                  fontSize:16,
                    top:20,
                    left:15,
                    position:"absolute"
                  
                  }}>Try Reseller Account</Text>
                  <View style={{width:"50%",
                  top:50,
                  left:15,
                  position:"absolute"
                   }}>
                    <Text style={{fontFamily:"DMSans-Medium",fontSize:12}}>
                    Upgrage now to reseller. 
                    Get discount on any,
                    services purchased as a
                    reseller.
                    </Text>
                    <Space height={8}/>
                   <View style={{width:"100%"}}>
                       <Btn
                         onPress={
                          ()=>{
                             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                             navigation.navigate('AddBvn')
                           
                           }}
                            Text={resel?("You've upgraded"):("Upgrade now")} 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            disabled={resel?(true):(false)}
                            //onPress={()=>Payment()}
                             />
                   </View>
                    </View>
                  </Pressable>
                  <Space height={200}/>
             </View>
      
         </ScrollView>
    
      </SafeAreaView>
      
      
   
      </SafeAreaProvider>
  )
}

export default HomeScreen