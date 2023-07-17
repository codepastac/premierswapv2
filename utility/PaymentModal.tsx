import React, {useEffect, useState,useRef} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,ScrollView, TouchableOpacity} from 'react-native';
import {Btn,Slash,Space,colors, emages,Pinview,Alerts,LoadingScreen,} from './index'
import { MaterialIcons } from '@expo/vector-icons';
import { List, MD3Colors } from 'react-native-paper';
import { CheckPin } from '../screen/service';
import { StorageGet } from '../service/storage';
import ModalBg from './ModalBg';
import { Modalize } from 'react-native-modalize';
interface PaymentModalProps{
  Show: boolean,
  setShow: any,
  Product:string
  ProductName:string
  ProductImage:any,
  Amount:string
  
  onClick(): void 

}
const PaymentModal:React.FC<PaymentModalProps> = ({Show,setShow,Amount,Product,ProductImage,ProductName,onClick}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
   
     
      
          
    <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={Show}
        statusBarTranslucent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          
        <View style={styles.centeredView}>
         <View style={styles.modalView}>
         <Pressable style={{backgroundColor:colors.swhite,borderRadius:100,width:65,height:10,alignSelf:"center",top:-15}}>
        </Pressable>
         <TouchableOpacity
          onPress={()=>setShow(false)}
          style={{
                        top:-35,
                        backgroundColor:colors.line,
                        width:33,
                        height:33,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        alignSelf:"flex-end",
                        left:0
                        }}>
                    <Image source={emages.Cancel} 
                    style={{width:10,height:10}}/>
         
                        </TouchableOpacity>
          <ScrollView>
        
                        <Space height={20}/>
            <View style={{width:"150%",alignSelf:"center"}}> 
           
               
                       <View style={{flexDirection:"row",alignSelf:"center",top:-20}}>
                       <View style={{
                        top:10,
                        backgroundColor:colors.line,
                        width:30,
                        height:30,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        left:0
                        }}>
                    <Text 
                    style={{fontFamily:"Poppins-SemiBold",
                    fontSize:14}}>₦</Text>
                 </View>
                 <Text 
                    style={{fontFamily:"Poppins-SemiBold",
                    fontSize:35}}> {numberWithCommas(Amount)}.00</Text>
                       </View>
                    <Slash/>



                    <Space height={10}/>

                    <View style={{flexDirection:"column",width:"65%",alignSelf:"center",justifyContent:"space-evenly"}}>
                                    <Pressable style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"105%"}}>
                                        <Text
                                        style={{ fontFamily:"Poppins-Regular",fontSize:13}}
                                         >ProductName</Text>
                                        
                                       
                                        <View style={{
                       
                                        backgroundColor:colors.white,
                                        width:100,
                                        height:50,
                                        borderRadius:100,
                                        
                                        justifyContent:"center",
                                        left:0,
                                        top:0,
                                        flexDirection:"row",
                                        alignItems:"center"
                                        }}>
                                           <Text
                                         style={{ fontFamily:"Poppins-Bold",fontSize:13,textAlign:"right"}}
                                         >{ProductName}
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
                                       {Product=="GIFTCARD_BUY"?(
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
                                   
                                      <Space height={0}/>
                                        <Slash/>
                                        <Space height={20}/>

                                    <Pressable style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                        <Text
                                        style={{ fontFamily:"Poppins-Regular",fontSize:13}}
                                         >Product Type</Text>
                                        
                                        <Text
                                         style={{ fontFamily:"Poppins-Bold",fontSize:13,left:-7}}
                                         >#{Product}</Text>
                                         
                                    </Pressable>
                                    
                                    <Space height={20}/>
                                        <Slash/>
                                        <Space height={20}/>


                                    <Pressable style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                        <Text
                                        style={{ fontFamily:"Poppins-Regular",fontSize:13,}}
                                         >Product Amount</Text>
                                        
                                        <Text
                                         style={{ fontFamily:"Poppins-Bold",fontSize:13}}
                                         >NGN{Amount}.00</Text>
                                    </Pressable>
                              
                          
                   
                       <Space height={20}/>
                       
                       </View>

                       <View style={{top:20,left:10,width:"65%",alignSelf:"center"}}>
                         <Btn
                            Text={`Complete Payment`} 
                            Btncolor={colors.primary} 
                            radius={100}
                            height={40}
                            //disabled={Phone.length!=11?(true):(amt.length==0?(true):(false))}
                            onPress={()=>onClick()}
                             />

                    </View>
                    <Space height={80}/>
                      </View>
         
          </ScrollView>
         </View>
                    </View>
                  
                  </Modal>
                  
 

        </View>
       
     
 
  
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   //backgroundColor:"rgba(0,0,0,0.1)"
  },

  modalView: {
    
    backgroundColor: 'white',
    borderRadius:0,
    padding: 35,
   
    height: "54%",
   
  
    position: 'absolute', //Here is the trick
    bottom: 0,
    width:"100%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
     
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PaymentModal