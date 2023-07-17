import React,{useContext, useEffect, useRef,useState} from 'react'
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image,Button} from 'react-native';
//import {  Dialog, Portal, } from 'react-native-paper';
///import Toast from 'react-native-toast-message';
//import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import {Space, colors, emages} from './index';
import { ToastContext } from '../context/AlertContext';
import { StateRefresh } from '../context/StateRefresh';
 interface AlertProps{
 Type: string,
 Label:string,
 EText: string,
 Show:boolean,
 Content: string,
 //Refresh:number,
 onClick(): void
 }
const Alerts:React.FC<AlertProps> = ({Type,Label,EText,Content,Show,onClick}) => {
 const{setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
 const {refresh,setRefresh}=useContext(StateRefresh);
 useEffect(()=>{
 //setRefresh(refresh+1)
 if(Show){
 setEtype(Type);
 setTitle(EText);
 setMsg(Content)
 EnableToast(Show);
 }
// console.log("Alert refresh:"+refresh);
  
 
 },[])
 
}


export default Alerts