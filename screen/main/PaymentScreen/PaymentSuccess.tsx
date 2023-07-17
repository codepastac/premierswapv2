//import liraries
import React, { Component, useContext, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView,Pressable,Image } from 'react-native';
import { colors,emages,Space,Slash } from '../../../utility';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation,useRoute } from '@react-navigation/native';
// create a component
// status:"Successful!",
// amount:amt,
// productType:"Airtime",
// ProductImage:ProductImage,
// ProductStatus:req?.data.msg
import { Octicons,MaterialCommunityIcons,Ionicons,EvilIcons,MaterialIcons } from '@expo/vector-icons';
import { PinContext } from '../../../context/PinContext';
const PaymentScreen = () => {
  const {Transaction_done,setTDone}=useContext(PinContext);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    const Navigation= useNavigation() as any;
    const route=useRoute()
 const {status,amount,productType,ProductImage,ProductStatus}=route.params as any;
 useEffect(()=>{
  setTDone(Transaction_done+1);
 },[])   
 return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.white,}}>
        <View>
        <ScrollView >
          
          <Space height={40}/>
            <Pressable 
            onPress={()=>Navigation.navigate('BottomNav')}
            style={{
                          top:-20,
                          backgroundColor:colors.line,
                          width:35,
                          height:35,
                          borderRadius:100,
                          alignItems:"center",
                          justifyContent:"center",
                          alignSelf:"flex-start",
                          left:30
                          }}>
                      <Image source={emages.Cancel} 
                      style={{width:12,height:12,tintColor:"black"}}/>
           
                          </Pressable>
                          <Space height={50}/>
                    <View style={{alignItems:"center"}}>
                     <View style={{
                        top:-50,
                        backgroundColor:colors.line,
                        width:60,
                        height:60,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        
                        }}>
               <Image source={status=="Successful!"?(emages.Success):(emages.Error)} />
               
               </View>
                <Text style={{top:-40,fontFamily:"DMSans-Bold"}}>{status}</Text>
                        <Space height={0}/>
                       <View style={{flexDirection:"row",alignSelf:"center",top:-20,}}>
                       <View style={{
                        top:15,
                        backgroundColor:colors.line,
                        width:20,
                        height:20,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        left:0
                        }}>
                        <Text 
                        style={{fontFamily:"DMSans-Bold",
                        fontSize:13}}>₦</Text>
                    </View>
                 <Text 
                    style={{fontFamily:"DMSans-Bold",
                    fontSize:35}}>{numberWithCommas(amount)}.00</Text>
                       </View>

                      
                       <Space height={10}/>
                    <View style={{flexDirection:"column",width:"85%",alignSelf:"center",justifyContent:"space-around",backgroundColor:colors.white}}>
                                    <Pressable style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                        <Text
                                        style={{ fontFamily:"Poppins-Regular",fontSize:13}}
                                         >ProductType</Text>
                                        
                                          <View style={{
                       
                                        backgroundColor:colors.white,
                                        width:100,
                                        height:50,
                                        borderRadius:100,
                                        
                                        justifyContent:"center",
                                        
                                        top:0,
                                        flexDirection:"row",
                                        alignItems:"center",
                                        left:-10
                                      
                                        }}>
                                           <Text
                                         style={{ fontFamily:"Poppins-Bold",fontSize:13,textAlign:"right",top:0}}
                                         >{productType}
                                        </Text>
                                           <View style={{
                       
                                            backgroundColor:colors.line,
                                            width:30,
                                            height:30,
                                            borderRadius:100,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            left:0,
                                            
                                            }}>
                                       
                                       {productType=="GIFTCARD_BUY"?(
                                          <Image style={{width:18,height:18,borderRadius:100,}}
                                          source={{
                                            uri: `${ProductImage}`,
                                          }}
                                          /> 
                                          ):(
                                              <Image style={{width:18,height:18,borderRadius:100,}}source={ProductImage}/> 
                                          )}
                                     
                                              </View>
                                           </View> 
                                      
                                      </Pressable>
                                   
                                      
                                        <Slash/>
                                        <Space height={20}/>
                    </View>

                      <Pressable style={{
                        backgroundColor:colors.line,
                        width:"90%",
                        height:95,
                        borderRadius:10,
                        justifyContent:"center",
                        alignItems:"center"
                        }}>
                    <EvilIcons name="share-apple" size={24} color={colors.primary} style={{top:-5}}/>
                      <Text style={{fontFamily:"Poppins-Regular"}}>Share </Text>
                      </Pressable>
                         </View>
                         <Space height={70}/>
                          </ScrollView>
                          </View>
                          </SafeAreaView>
          
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default PaymentScreen;
