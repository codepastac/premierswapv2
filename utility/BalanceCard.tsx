import { View, Text, TouchableOpacity, ImageBackground, Pressable } from 'react-native'
import React, { useState,useEffect, useContext } from 'react'
import { Card } from 'react-native-paper'
import colors from './colors'
import { Ionicons,Feather,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import { StorageGet } from '../service/storage';
import { FetchBalance } from '../screen/service';
import {emages,Btn} from './index';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { StateRefresh } from '../context/StateRefresh';
interface BalanceProps{
  bvn:boolean,
  refresh:any

}
const BalanceCard:React.FC<BalanceProps> = ({bvn,refresh}) => {
  //const {refresh,setRefresh}=useContext(StateRefresh);
  const navigation=useNavigation();
    const [Hide,setHide]=useState(true);
    const [Balance,SetBal]=useState("0.00");
    const BalHide=()=>{
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        if (Hide == false) {
            setHide(true);

        } else {
            setHide(false);
        }
    }

    useEffect(()=>{
      
     
        
      setTimeout(() => {
          
        try {
         
          StorageGet('@app_login_code')
      .then((data)=>{
        let payload=JSON.stringify({
          appcode:data
        });
        FetchBalance(payload)
        .then((req)=>{
          SetBal(req?.data.bal);
          console.log(req?.data);
        });
      })
        } catch (err) {
          SetBal("Network issue.");
        }
      },4000);
   
       

    })

  return (
    <View style={{flexDirection:"column",justifyContent:"center",width:"90%",alignSelf:"center"}}>
    
    <ImageBackground source={emages.BalCard} style={{width:"100%",height:200,alignSelf:"center",}}>
                 
                 
                 <View style={{flexDirection:"row",justifyContent:"space-evenly",top:20}}>
                 <View style={{flexDirection:"column",left:-10}}>

                 <Text 
                  style={{color:"#E7E9F8",
                  fontFamily:"DMSans-Medium",
                  fontSize:15,
                   
                   
                  }}>Total Balance</Text>
                  <Text 
                  style={{color:"#E7E9F8",
                  fontFamily:"DMSans-Medium",
                  fontSize:22,
                   top:20
                  
                  }}>{Hide?('******'):("₦"+ Balance)}
         

                  </Text>
                 </View>
                  <Text 
                  style={{color:"#E7E9F8",
                  fontFamily:"DMSans-Medium",
                  fontSize:15,
                 
                  left:40
                  }}>Hide Balance</Text>
                <TouchableOpacity style={{left : 13,top:-5,borderRadius:100,padding:5}}
                onPress={()=>BalHide()}
                >
                <FontAwesome name={Hide?('eye-slash'):('eye')} size={15} color={colors.white} />
              
                </TouchableOpacity>
                 </View>
                 
                 
                 
              <View style={{width:"85%",alignSelf:"center",top:80,left:5}}>
            
                 <Pressable
                 
                  onPress={
                    bvn?(
                      ()=>{
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('AddMoney')
                      }
                    ):(
                      ()=>{
                        
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('AddBvn')
                      }
                    )
                  }
                 style={{borderRadius:3,height:55,backgroundColor:colors.swhite,justifyContent:"center",alignItems:"center"}}
                  
                  >
                   <View style={{flexDirection:"row",}}>
                    
                    <Text 
                    style={{color:colors.primary,
                    fontFamily:"Poppins-SemiBold",
                    }}>Fund Wallet</Text>
                     <Ionicons name="ios-wallet" size={13} color={colors.primary} style={{left:5,top:1}}/>
                    
                    </View>

                  </Pressable>
                 </View>
    </ImageBackground>  
    </View>
    )
}

export default BalanceCard