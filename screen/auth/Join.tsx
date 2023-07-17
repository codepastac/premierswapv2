import { View, Text,SafeAreaView, ScrollView, KeyboardAvoidingView ,Platform, TouchableOpacity,Dimensions,Image,ActivityIndicator} from 'react-native'
import React,{useState,useRef,useEffect, useContext} from 'react'
import { colors,FontSize,emages,Btn,Space,Alerts,LoadingScreen } from '../../utility/index'
import { TextInput,Checkbox,HelperText} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RegisterAuth } from './service';
import { RegisterContext } from '../../context/RegisterContext';
import { useValidation } from 'react-native-form-validator';
import { StateRefresh } from '../../context/StateRefresh';
import { ToastContext } from '../../context/AlertContext';
const Join = () => {
  const {firstname,secondname,setFN,setSN,username,setuser,email,setEmail,telephone,setTelephone,pwd, setPwd}=useContext(RegisterContext);
  const Navigation= useNavigation();
  const { refresh, setRefresh} =useContext(StateRefresh);
  const {setEtype,setTitle,EnableToast,setMsg}=useContext(ToastContext);
  const [text, setText] = useState('');
  const [Checksecure, SetSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const [ValidateMsg, setVal] = useState("");
  const [loading, setLoad] = useState(false);

  const [error,setError]=useState(false);



  const [disabled, setDisable] = useState(false);
  const { validate, isFieldInError, getErrorsInField, getErrorMessages,isFormValid } =
  useValidation({
    state: {firstname,secondname,username,email,telephone,pwd },
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
      const Register =()=>{
       validate({
        firstname: { required: true,},
        secondname: { required: true,  },
        username:{ minlength: 4,  maxlength: 15,required: true, },
        email: { email: true ,required: true},
        telephone: {minlength: 11,maxlength:11,required:true, },
        pwd: { required: true},
       
           });
        
    if (isFormValid()==true){
          setVal("");
              setDisable(true);
              setLoad(true);
              let payload=JSON.stringify({
                username:username,
                email:email,
                telephone:telephone,
                type:"validate"
            });
              RegisterAuth(payload)
              .then((req)=>{
                if ( req?.data.error == true) {
                  
                  setDisable(false);
                  setLoad(false);
                  //setVal(req?.data.msg);
                  EnableToast(true);
                  setEtype("Error")
                  setTitle("Error Info");
                  setMsg(`${req?.data.msg}`);
                } else {
                setRefresh(refresh+1)
                Navigation.navigate('Create_passcode');
                setDisable(false);
                  setLoad(false);
                  }
                
              });
          

              }


          }
        useEffect(()=>{
         //console.log("make")
         
        },[username,email,telephone])

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
  
         <Text style={{fontFamily:"Poppins-Bold",fontSize:FontSize.normal,color:colors.secondary,textAlign:'center'}}>Create An Account !</Text>
         <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,textAlign:'center'}}>Set up your account in few minutes</Text>
         
         <Space height={35}/>
         <View style={{justifyContent:"center",flexDirection:"column",marginLeft:20,marginRight:20}}>
         <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>First Name</Text>
         <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                value={firstname}
                
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
              onChangeText={firstname => setFN(firstname)}
              
            />
            {isFieldInError('firstname') &&
        getErrorsInField('firstname').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{errorMessage}</Text>
        ))}

      <Space height={30}/>
           <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Last Name</Text>
         <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                value={secondname}
                
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
              onChangeText={secondname => setSN(secondname)}
              
            />
            {isFieldInError('secondname') &&
        getErrorsInField('secondname').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{errorMessage}</Text>
        ))}



            <Space height={30}/>
             <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Sign-in username</Text>
            <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                value={username}
                 activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                onChangeText={username => setuser(username)}
                
              
            />
        {isFieldInError('username') &&
        getErrorsInField('username').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{errorMessage}</Text>
    
        ))}
        
        <Space height={30}/>
             <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Email Address</Text>
            <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                value={email}
                activeUnderlineColor={colors.primary}
               underlineColor={colors.secondary}
               onChangeText={email => setEmail(email)}
           
           />
           {isFieldInError('email') &&
        getErrorsInField('email').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{errorMessage}</Text>
    
        ))}
             <Space height={30}/>
             <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Phone number</Text>
            <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                value={telephone}
                
                keyboardType="numeric"
                activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                onChangeText={telephone => setTelephone(telephone)}
           
              
            />
            {isFieldInError('telephone') &&
        getErrorsInField('telephone').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{errorMessage}</Text>
    
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
                value={pwd}
                onChangeText={pwd => setPwd(pwd)}
           
                right={<TextInput.Icon icon={Checksecure?('eye'):('eye-off')} onPress={Secure} />}
            />
            {isFieldInError('pwd') &&
        getErrorsInField('pwd').map((errorMessage,i) => (
          <Text style={{color:"red",fontFamily:"Poppins-Regular",fontSize:12,top:10}} key={i}>{`The field password is required.`}</Text>
    
        ))}
             <Space height={30}/>
             <Btn
                  Text="Sign Up" 
                  Btncolor={colors.primary} 
                  onPress={Register}
                  radius={100}
                  height={55}
                  
                  disabled={disabled}
                  />
          </View>
        
   
            <Space height={30}/>
           {/* <Text> {getErrorMessages()}</Text> */}
            
                  <View 
                      style={{justifyContent:'space-around',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>Navigation.navigate('Login')}>
                              <Text style={{fontFamily:"Poppins-Light",top:10}}>Already have an account ? <Text style={{fontFamily:"Poppins-Bold", color:colors.primary}}>Sign In</Text></Text>
                              </TouchableOpacity>
                            </View>


                         <Space height={50}/>

      </ScrollView>
      
          <LoadingScreen Show={loading} noLogo={true}/>
      </KeyboardAvoidingView>
      </SafeAreaView>
  )
} 

export default Join;