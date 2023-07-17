//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView, Pressable, Image} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Space, TopBar,colors, emages } from '../../utility';
import { useNavigation } from '@react-navigation/native';
import { Ionicons ,MaterialCommunityIcons } from '@expo/vector-icons';
// create a component
const AllBills = () => {
    const navigation= useNavigation();
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.lightgrey,}}>
      <StatusBar/>
     <TopBar Title="Pay Bills" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
      <SafeAreaView>
       <ScrollView>
       <Text style={{
       fontFamily:"Poppins-Regular",
        left:20,
        marginTop:30,
        fontSize:14
         }}>
        Choose Bills
         </Text>
         <Space height={20}/>
        <View style={{flexDirection:"column",justifyContent:"space-evenly",alignItems:"center"}}>
         <Pressable
         onPress={()=>navigation.navigate('Cable')}
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
                        <Ionicons name="tv" size={15} color={colors.primary} />
                     </View> 
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Cable </Text>
         </Pressable>
         <Space height={20}/>
         <Pressable 
           onPress={()=>navigation.navigate('Elec')}
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
                        <Ionicons name="bulb-sharp" size={15} color={colors.primary} />
                     </View> 
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Electricity </Text>
                </Pressable>


                <Space height={20}/>


               <Pressable
                onPress={()=>navigation.navigate('Education')}
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
                        
                      
                      <MaterialCommunityIcons name="book-education-outline" size={15} color={colors.primary} />
                     </View> 
            <Text style={{left:20,fontFamily:"Poppins-Regular",}}>Education</Text>
         </Pressable>




        </View>
     

        <Space height={100}/>

     </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    );
};



//make this component available to the app
export default AllBills;
