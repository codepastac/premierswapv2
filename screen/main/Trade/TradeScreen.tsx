//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages } from '../../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
// create a component
const TradeScreen = () => {
    const navigation= useNavigation();
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/>
     <TopBar Title="Trade" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
      <SafeAreaView>
       <ScrollView>
       <Text style={{
       fontFamily:"Poppins-Regular",
        left:35,
        marginTop:30,
        fontSize:14
         }}>
        Choose 
         </Text>
         <Space height={10}/>
        <View style={{flexDirection:"column",justifyContent:"space-evenly",alignItems:"center",left:10}}>
         <Pressable
         onPress={()=>navigation.navigate('Airtime2Cash')}
         style={{
            backgroundColor:colors.lightgrey,
            width:"95%",
            borderRadius:6,
            height:70,
           
            flexDirection:"row",
            alignItems:"center",
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
                        <Ionicons name="md-phone-portrait" size={15} color={colors.primary} />
                        
                     </View> 
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Airtime2Cash</Text>
         </Pressable>
         <Space height={20}/>
         <Pressable 
           onPress={()=>navigation.navigate('BuyGiftCard')}
             style={{
                backgroundColor:colors.lightgrey,
            width:"95%",
            borderRadius:6,
            height:70,
           
            flexDirection:"row",
            alignItems:"center",
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
                        <MaterialIcons name="card-giftcard" size={15} color={colors.primary} />
                        
                     </View> 
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Buy GiftCard</Text>
                </Pressable>


                <Space height={20}/>


               <Pressable
                onPress={()=>navigation.navigate('SellCard')}
                style={{
                    backgroundColor:colors.lightgrey,
                    width:"95%",
                    borderRadius:6,
                    height:70,
                
                    flexDirection:"row",
                    alignItems:"center",
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
                        
                      
                        <MaterialIcons name="card-giftcard" size={15} color={colors.primary} />
                     </View> 
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Sell GiftCard</Text>
                </Pressable>

                <Space height={20}/>
                <Pressable 
                onPress={()=>navigation.navigate('BuyCoin')}
                    style={{
                        backgroundColor:colors.lightgrey,
                    width:"95%",
                    borderRadius:6,
                    height:70,
                
                    flexDirection:"row",
                    alignItems:"center",
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
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Buy Cryptocurrency</Text>
                </Pressable>


                <Space height={20}/>


               <Pressable
                onPress={()=>navigation.navigate('SellCoin')}
                style={{
                    backgroundColor:colors.lightgrey,
                    width:"95%",
                    borderRadius:6,
                    height:70,
                
                    flexDirection:"row",
                    alignItems:"center",
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
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Sell Cryptocurrency</Text>
         </Pressable>






        </View>
     

        <Space height={100}/>

     </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    );
};



//make this component available to the app
export default TradeScreen;
