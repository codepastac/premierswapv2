//import liraries
import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { StorageGet } from '../service/storage';
import {DataItemBox,LoadingScreen, Space, colors} from './index';
import { BuyData, Cables } from '../screen/service';
interface CablePlanProps{
    Network:any,
    Amt:any,
    packageId:any,
    //Load:boolean,
    onClick():void
}
// create a component
const CableList:React.FC<CablePlanProps> = ({Network,packageId,Amt,onClick}) => {
    const[Loading,setLoad]=useState(false);
    const[active,setChoose]=useState(true);
    const[dataa,setdata]=useState(null);
    const[plans,setP]=useState(null);
    const[pamts,setpa]=useState(null);
    const[Plan,setPlan]=useState(null);

    const Pay = () =>{
        Amt(dataa)
        packageId(plans)
        onClick();
    }
    useEffect(()=>{
        if(dataa ==  null){

        } else {
            Pay();
        }
    },[dataa])
        const Display = () =>{
            if (Plan == null){
                return;
            } else {
                return(
                    <View style={{}}> 
                    {Plan.map(item=>(
                     <View style={{flexDirection:"column",alignItems:"center",}}>
                       
                     <View style={{
                         flexDirection:"row",justifyContent:"space-between",
                       
                      }}>
                        
                     <Pressable 
                       onPress={()=> {
                         setdata(item.plan_price) 
                         setP(item.plan_code)
                         //setpa(item.actual_amt)
                       }}
                         style={{
                         backgroundColor:colors.white,
                         height:40,
                          flexDirection:"row",
                          width:"115%",
                          justifyContent:"space-around",
                          alignItems:"center",
                          borderColor:dataa==item.plan_price?(colors.primary):(colors.line),
                         borderWidth:1,
                         
                     }}>
                         
                     <Text style={{fontFamily:"Poppins-Regular",color:"black",left:-30}}>{item.plan_name}</Text>
                     <Text style={{fontFamily:"Poppins-Regular",color:"black",left:30,}}>₦{item.plan_price}</Text>
                     
                     </Pressable>
                     
                        <Space height={60}/>
                 </View>
                   
                 </View>

                    ))}
                    </View>
                    );
            }
        }
        useEffect(()=>{
           
            setLoad(true)
            StorageGet("@app_login_code")
            .then((db)=>{
                console.log(db)
                let payload=JSON.stringify({
                    appcode:db,
                    network:Network,
                    //smartno:Smartno,
                    type:"Package"
                });

                Cables(payload).then((req)=>{
                    setLoad(false);
                    setPlan(req?.data)
                    console.log(req?.data)

                }).catch(()=>{
                    setLoad(false);
                })
            })
        },[Network]);
    return (
       <View style={{flexDirection:"column",}}>
                        <Text style={{
                                fontFamily:"Poppins-Regular",
                                left:20,
                                marginTop:30
                        }}>
                            Select Package
                        </Text>
         <View style={{
               
               backgroundColor:colors.line,
                width:"80%",
                
                flexDirection:"row",
                justifyContent:"space-around",
                alignItems:"center",
                 alignSelf:"center",
                 padding:20,
                }}>
                   
                  <Display/>
                   
                   
                 </View>
                           <LoadingScreen Show={Loading}/>
       </View>
    );
};



//make this component available to the app
export default CableList;
