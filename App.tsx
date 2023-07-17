import React,{ lazy, Suspense,useEffect,useState } from "react";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import UnSecureRoute from './unSecureRoute';
import SecureRoute from "./SecureRoute";
import { PinContext } from './context/PinContext';
import { RegisterContext } from './context/RegisterContext';
import { colors } from './utility';
import { StorageGet,StorageRemove } from './service/storage';
import { LoginContext } from "./context/LoginContext";
import { LogBox } from 'react-native';
import { Splash } from "./screen/startup";
import { StateRefresh } from "./context/StateRefresh";
import { Acc_details } from "./screen/service";
import {Alerts} from "./utility";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { ToastContext } from "./context/AlertContext";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

 LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary:colors.secondary,
  },
};
const App = () => {
  const [Login,setLogin]=useState(false);
  const [passcode,setPasscode]=useState(0);
  const [cpasscode,setcPasscode]=useState(0);
  const [Tpin,setTpin]=useState(0);
  const [Transaction_done,setTDone]=useState(0);

  const [firstname, setFN] = useState("");
  const [secondname, setSN] = useState("");
  const [username, setuser] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState(0);
  const [pwd, setPwd] = useState("");
  const [refresh,setRefresh]=useState(0);
  const [Loading,setLoading]=useState(false);
   const [Etype, setEtype] = useState("");
   const [title, setTitle] = useState("");
   const [msg, setMsg] = useState("");
   const [isToast, EnableToast] = useState(false);
    //const [states, setState] = useState<any>(0);
    //const isReady = useIsReady(states);
   // const [error,setError]=useState(fal);
  useEffect(()=>{
    StorageGet('@app_login')
    .then((data)=>{
   if (data == "yes") {
        setLogin(true);
        
      } else {
        setLogin(false);
      }
    })
  },[]);
  useEffect(()=>{
   if(isToast){
    Toast.show({
      type:Etype=="Error"?(ALERT_TYPE.DANGER):(Etype=="Warning")?(ALERT_TYPE.WARNING):(ALERT_TYPE.SUCCESS),
      title:title,
      textBody: msg,
      autoClose:true,
      onHide:()=>{
      EnableToast(false)
      setEtype("");
      setTitle("");
      setMsg("");
    
      }
    })
   }
   },[msg])
  useEffect(()=>{
    if(Login==true){
      setInterval(() => {
        StorageGet("@app_login_code")
                .then((db)=>{
                  let payload=JSON.stringify({
                    appcode:db,
                    type:"verify"
                });
                Acc_details(payload).then((req)=>{
                  if(req?.data.status==false){
                    setRefresh(refresh+1)
                       StorageRemove().then((check)=>{
                        //NativeModules.DevSettings.reload();
                        setLogin(false);
                        
                      });
                  
                  }
                  // console.log(req?.data)
                })
                })
      }, 10000);
    }
  })
  return (
    <AlertNotificationRoot>
    <PaperProvider theme={theme}>

     <ToastContext.Provider value={{setEtype,setTitle,EnableToast,setMsg,setLoading,}}>
     <StateRefresh.Provider value={{refresh,setRefresh}}>
      <LoginContext.Provider value={{Login,setLogin}}>
     <RegisterContext.Provider value={{firstname,secondname,setFN,setSN,username,setuser,email,setEmail,telephone,setTelephone,pwd, setPwd}}>
      <PinContext.Provider value={{passcode,setPasscode,cpasscode,setcPasscode,Tpin,setTpin,Transaction_done,setTDone}}>
      <Suspense fallback={<p></p>}>

      {Login?(<SecureRoute/>):(<UnSecureRoute/>)}
      </Suspense>
        
      </PinContext.Provider>
      </RegisterContext.Provider>
    
     </LoginContext.Provider>
     </StateRefresh.Provider>
     </ToastContext.Provider>
     
    </PaperProvider>
    
    </AlertNotificationRoot>
  
   );
};

export default App;