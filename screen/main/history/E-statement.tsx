//import liraries
import { View, Text,SafeAreaView, ScrollView,Pressable,Image} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { colors,HisTable,Space,TopBar ,emages,NetworkCard,Btn,Alerts,LoadingScreen, Slash} from '../../../utility';
import {  SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Avatar, Card} from 'react-native-paper';
import {TextInput,Tooltip} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { StatusBar } from 'expo-status-bar';
import { StorageGet } from '../../../service/storage';
import { Acc_details, CreateAccount, FetchBalance, Upgrade } from '../../service';
//import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { MaterialIcons,MaterialCommunityIcons,AntDesign,Ionicons,Entypo,Feather,SimpleLineIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { StateRefresh } from '../../../context/StateRefresh';
import { ToastContext } from '../../../context/AlertContext';
// create a component
const EStatement = () => {
  const {refresh,setRefresh}=useContext(StateRefresh);
    const  navigation=useNavigation() as any;
    const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext); 

    const [His1,setHis1]= useState(true);
    const [His2,setHis2]= useState(false);
    const [Loading,setLoadss]= useState(false);
    const [Loadings,setLoads]= useState(false);
    const [bvn,setBvn]= useState(false);
   
    const [email, setUsername] = useState("");
    const [password, setPwd] = useState("");
    const [fee, setFee] = useState("");
   
    const [amt, setamt] = useState("0");
    const [acct,setAcct]= useState(false);
    const [acct_name,setan]= useState("");
    const [acct_no,setano]= useState("");
    const [bank_name,setbn]= useState("");
    const [error,setError]=useState(false);
    const [copiedText, setCopiedText] = useState('');
    
    return (
     <SafeAreaProvider style={{flex:1,backgroundColor:colors.swhite,}}>
                <StatusBar/>
                <TopBar Title="Account Statement" Back={true} onClick={()=>navigation.navigate('BottomNav')}/>
                <SafeAreaView>
        
                <ScrollView>

                <Space height={40}/>
                   
                       <View>
                       <View style={{backgroundColor:colors.white,width:"90%",height:600,borderRadius:10,flexDirection:"column",alignSelf:"center"}}>
                       <Space height={20}/>
                       <View
                       style={{
                           backgroundColor:colors.primaryLight,
                           
                           borderRadius:100,
                           width:50,
                           height:50,
                           justifyContent:"center",
                           alignItems:"center",
                           left:20
                       
                       }}>
                       <SimpleLineIcons name="cloud-download" size={23} color={colors.primary} /></View>
                       
                       <Text style={{color:colors.secondary,
                       fontFamily:"DMSans-Bold",
                       fontSize:16,
                       left:25,
                       top:15
                       
                       }}>Here are the steps to export your Account Statement:</Text>
                       
                       <Space height={20}/>

                    <View style={{width:"80%",flexDirection:"column"}}>
                    <Text style={{color:colors.dark,
                        fontFamily:"DMSans-Medium",
                        fontSize:14,
                        left:25,
                        marginTop:20
                        
                        }}>1. Log on to <Text style={{color:colors.primary,fontWeight:"900"}}>premierswapng.com</Text> on your device .</Text>
                    <Text style={{color:colors.dark,
                        fontFamily:"DMSans-Medium",
                        fontSize:14,
                        left:25,
                        marginTop:20
                        
                        }}>2. Log in to your premierswapng dashboard.</Text>

                <Text style={{color:colors.dark,
                        fontFamily:"DMSans-Medium",
                        fontSize:14,
                        left:25,
                        marginTop:20
                        
                        }}>3. Open the menu and scroll down to find the account statement.</Text>

                          <Text style={{color:colors.dark,
                        fontFamily:"DMSans-Medium",
                        fontSize:14,
                        left:25,
                        marginTop:20
                        
                        }}>4. On the account statement page, click on the export button to save or print your Account Statement shown in the image below.</Text>



                    </View>

                    <Space height={30}/>
                    <Image source={emages.EST} style={{width:"60%",height:200,alignSelf:"center",borderRadius:0}}/>
                  </View>
                  </View>
                  <Space height={100}/>
                </ScrollView>
                  
                    
      </SafeAreaView>
    </SafeAreaProvider>
    );
};

// define your styles


//make this component available to the app
export default EStatement;
