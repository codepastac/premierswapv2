import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,ScrollView, TouchableOpacity,FlatList} from 'react-native';
import {Btn,Slash,Space,colors, emages,Pinview,Alerts,LoadingScreen} from './index'
import { MaterialIcons } from '@expo/vector-icons';
import { List, MD3Colors } from 'react-native-paper';
import { CheckPin, GetBank } from '../screen/service';
import { StorageGet } from '../service/storage';
import { Searchbar } from 'react-native-paper';

interface TpinModalProps{
  Show: boolean,
  setShow: any,
  PStatus:any,
  setBank:any,
  setBankCode:any
  onClick(): void 
}
const BankModal:React.FC<TpinModalProps> = ({Show,setShow,PStatus,setBank,setBankCode,onClick}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [Etype, setEtype] = useState("");
 
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [Pin, SetPin] = useState(0);
  const [Loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [chance,setChance]=useState(4);
  const [Bank,SetBank]=useState(null);
  const [Banks,SetBanks]=useState(null);
  const [q,Setq]=useState("");
  const [countq,SetC]=useState(0);
  const close=()=>{
    setError(false);
  }
  const GetSearch= (q) =>{
    let result= Bank.filter((data)=>{
     if(q.length > 2 ){
       return data.bank_name.substring(0, 3)==q.toUpperCase().substring(0, 3);
     } else {
      return data.bank_name==q.toUpperCase();
     }
    } )
   // setBank();
    console.log(result);

  }
  

  
   useEffect(()=>{
    GetBank().then((req)=>{
      SetBank(req?.data);
      //console.log(req?.data);
    })
   },[]) 
   useEffect(()=>{
   
    if (q.length==0){
      GetBank().then((req)=>{
        SetBanks(null);
        SetBank(req?.data);
        SetC(0);
        //console.log(req?.data);
      })
    } else if(q.length >= 1 ){
      let Result = Bank.filter((data:any)=>{
        if(data.bank_name.toUpperCase().includes(q.toUpperCase())){
          return data.bank_name.toUpperCase().includes(q.toUpperCase())
          } 
      })
       //alert(Result.bank_name)
       SetBanks(Result);
      console.log(Result);
      
    } 
   },[q])
  return (
    <View>
    
    <View style={{flex: 1,
        backgroundColor:"rgba(0,0,0,0.5)"
    }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Show}
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
                        top:-30,
                        backgroundColor:colors.line,
                        width:35,
                        height:35,
                        borderRadius:100,
                        alignItems:"center",
                        justifyContent:"center",
                        alignSelf:"flex-end"
                        
                        }}>
                    <Image source={emages.Cancel} 
                    style={{width:10,height:10}}/>
         
             </TouchableOpacity>
         
            <Searchbar
              style={{backgroundColor:colors.lightgrey}}
              placeholder="Search"
              onChangeText={q=>{
                Setq(q)
               if(countq.toString().length > q.length){
                let size=countq.toString().length-q.length;
                SetC(size);
               } else {
                SetC(countq+1);
               }
              }}
              value={q}
              clearButtonMode='always'
              //mode='view'
              autoCapitalize='none'
              autoCorrect={false}

            />
            <Space height={50}/>
             {Banks == null?(<>
              <FlatList
                //ListHeaderComponent={HandleSearch}
                data={Bank}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={()=>{
                  setBank(item.bank_name)
                  setBankCode(item.bank_code)
                  setShow(false);
                }}
                style={{height:30,width:"90%"}}>
                 <Text>{item.bank_name}</Text>

                </TouchableOpacity>

                  )}
                ItemSeparatorComponent={<View>
                  <Space height={40}/>
                  <Slash/>
                  <Space height={20}/>
                </View>}
                />
             </>):(<>
              <FlatList
                //ListHeaderComponent={HandleSearch}
                data={Banks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                <TouchableOpacity 
                onPress={()=>{
                  setBank(item.bank_name)
                  setBankCode(item.bank_code)
                  setShow(false);
                }}
                style={{height:30,width:"90%"}}>
          <Text>{item.bank_name}</Text>

                </TouchableOpacity>

                  )}
                ItemSeparatorComponent={<View>
                  <Space height={40}/>
                  <Slash/>
                  <Space height={20}/>
                </View>}
                />
             
             </>)} 
     
                
          </View>
        </View>
       
      </Modal>
      

    </View>
   
      

      </View>
    
  
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"rgba(0,0,0,0.1)"
  },

  modalView: {
    
    backgroundColor: 'white',
    borderRadius:0,
    padding: 35,
   
    height: "95%",
   
  
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

export default BankModal