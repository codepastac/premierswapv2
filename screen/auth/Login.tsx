import { View, Text,SafeAreaView, ScrollView, KeyboardAvoidingView ,Platform, TouchableOpacity,Dimensions,Image,NativeModules} from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { colors,FontSize,emages,Btn,Space,LoadingScreen,Alerts } from '../../utility/index'
import { TextInput,Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useValidation } from 'react-native-form-validator';
import { LoginAuth } from './service';
import { StorageSave } from '../../service/storage';
import { LoginContext } from '../../context/LoginContext';
import { StateRefresh } from '../../context/StateRefresh';
import { ToastContext } from '../../context/AlertContext';
const Login = () => {
     const {Login,setLogin}= useContext(LoginContext);
     const {refresh,setRefresh}=useContext(StateRefresh);
     const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
        const Navigation= useNavigation();
        const [text, setText] = useState('');
       
        const [Checksecure, SetSecure] = useState(true);
        const [checked, setChecked] = useState(false);
       
        const [email, setUsername] = useState("");
        const [password, setPwd] = useState("");
    
        const windowWidth = Dimensions.get('window').width;
        const [Loading,setLoading]=useState(false);
        const [error,setError]=useState(false);
        const [disabled, setDisable] = useState(false);
        
      const { validate, isFieldInError, getErrorsInField, getErrorMessages,isFormValid } =
      useValidation({
        state: {email,password},
      });
        const Secure=()=>{
          if(Checksecure==true){
            SetSecure(false);
          } else {
            SetSecure(true);
          }
        }
        const close=()=>{
          setError(false);
        }
        const Signin = async()=>{
          
          validate({
            email: {required: true},
            password: { required: true},
          
              });

              if (isFormValid()==true){
                setLoading(true);
                setDisable(true);
                let payload=JSON.stringify({
                  username:email,
                  password:password,
                  type:"access"
                });

                LoginAuth(payload)
                .then((req)=>{
                  
                   if (req?.data.error == false) {
                    setDisable(false);
                    setLoading(false)
                  StorageSave("@app_login","yes");
                  StorageSave("@app_login_code",req?.data.login_code)
                  .then((sucess)=>{
                    if (sucess == true) {
                      setRefresh(refresh+1)
                      setDisable(false);
                      setLoading(false);
                      // EnableToast(true);
                      // setEtype("Success")
                      // setTitle("");
                      // setMsg(`Login Successful!`);
                      setLogin(true);
                      let user_details= JSON.stringify({
                        username : req?.data.username,
                        reseller : req?.data.reseller,
                        fullname:req?.data.fullname,
                        phone:req?.data.phone,
                        email:req?.data.email,
                        bvn:req?.data.bvn,
                      });
                      StorageSave("@app_user_details",user_details);
                    }
                    //console.log("@app_login_code:>>"+req?.data.login_code+"\n Storage:>>"+sucess);
                  });
                  
                   } else {
                  setRefresh(refresh+1)
                  setDisable(false);
                  setLoading(false);
                  EnableToast(true);
                  setEtype("Error")
                  setTitle("Error Info");
                  setMsg(`${req?.data.msg}`);
                   }
                 console.log(req?.data);

                });


              } else {
                //alert("false")
                
                  
              }
        }
        useEffect(()=>{
         
        })
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.white,}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          
        <ScrollView >
        <Space height={40}/>
        <View style={{alignItems:"center"}}>
        <Image source={emages.icon} style={{width:50,height:50,tintColor:colors.primary}}/>
        </View>
        <Space height={40}/>
        
       
         <Text style={{fontFamily:"Poppins-Bold",fontSize:FontSize.normal,color:colors.secondary,textAlign:'center'}}>Welcome Back !</Text>
         <Space height={35}/>
         <View style={{justifyContent:"center",flexDirection:"column",marginLeft:20,marginRight:20}}>
        
             <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Sign-in username / your email</Text>
            <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                 activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                value={email}
                onChangeText={email=>setUsername(email)}
              
            />
     {isFieldInError('email') &&
        getErrorsInField('email').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{`The field " your username / email" is mandatory`}</Text>
        ))}
            <Space height={30}/>
             <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Password</Text>
            <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                secureTextEntry={Checksecure}
                value={password}
                onChangeText={password=>setPwd(password)}
                right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
            
            />
             {isFieldInError('password') &&
        getErrorsInField('password').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{errorMessage}</Text>
        ))}
             <Space height={30}/>
             <TouchableOpacity onPress={()=>Navigation.navigate('Fpassword')}>
                             
             <Text style={{fontFamily:"Poppins-Light",textAlign:"right"}}>Forgot Password ? </Text>
                  </TouchableOpacity>           
             <Space height={30}/>
             <Btn
                  Text="Sign In" 
                  Btncolor={colors.primary} 
                  onPress={()=>Signin()}
                  radius={100}
                  height={55}
                  disabled={disabled}
                  
                  />
          </View>
            <Space height={30}/>
          
                  <View 
                      style={{justifyContent:'space-around',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>Navigation.navigate('Join')}>
                              <Text style={{fontFamily:"Poppins-Light",top:10}}>Don’t have an account? <Text style={{fontFamily:"Poppins-Bold", color:colors.primary}}>Sign Up</Text></Text>
                              </TouchableOpacity>
                   </View>


                  <Space height={50}/>

                 </ScrollView>
                    <LoadingScreen Show={Loading} noLogo={true}/>
      </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

export default Login