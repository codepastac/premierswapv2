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
                               
                                <Image style={{width:18,height:18,borderRadius:100,}}source={ProductImage}/> 
                             
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

               <View style={{top:20,left:10,width:"55%",alignSelf:"center"}}>
                 <Btn
                    Text={`Pay NGN${numberWithCommas(Amount)}.00`} 
                    Btncolor={colors.primary} 
                    radius={100}
                    height={40}
                    //disabled={Phone.length!=11?(true):(amt.length==0?(true):(false))}
                    onPress={()=>onClick()}
                     />

            </View>
            <Space height={100}/>
              </View>
 
  </ScrollView>
 </View>
            </View>
          
          </Modal>
          


