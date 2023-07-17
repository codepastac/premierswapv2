import { View, Text,SafeAreaView, ScrollView, KeyboardAvoidingView ,Platform, TouchableOpacity,Dimensions,Image} from 'react-native'
import React,{useState} from 'react'
import { colors,FontSize,emages,Btn,Space } from '../../utility/index'
import { TextInput,Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const Fpassword = () => {
  const Navigation= useNavigation();
  const [text, setText] = useState('');
  const [Checksecure, SetSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const windowWidth = Dimensions.get('window').width;
    const Secure=()=>{
      if(Checksecure==true){
        SetSecure(false);
      } else {
        SetSecure(true);
      }
    }
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
        
       
         <Text style={{fontFamily:"Poppins-Bold",fontSize:FontSize.normal,color:colors.secondary,textAlign:'center'}}>Forgot Password !</Text>
         <Space height={65}/>
         <View style={{justifyContent:"center",flexDirection:"column",marginLeft:20,marginRight:20}}>
        
            <View style={{alignItems:"center"}}><Image source={emages.Fpassword} /></View>
            <Space height={35}/>
             <Text style={{textAlign:"center",fontFamily:"Poppins-Regular",color:colors.grey}}>Enter your registered email below to receive
password reset instruction</Text>

             <Space height={50}/>

             <Text style={{fontFamily:"Poppins-Regular",color:colors.grey,}}>Sign-in Email Address</Text>
            <Space height={15}/>
            <TextInput 
                style={{backgroundColor:"#F7F7F7",borderRadius:4,borderColor:"#0F0D23",width:'100%'}}
                label=""
                 activeUnderlineColor={colors.primary}
                underlineColor={colors.secondary}
                
              
            />
            <Space height={30}/>
               

             <Btn
                  Text="Send verification instruction" Btncolor={colors.primary} 
                  onPress={()=>console.log('Forgot password')}
                  radius={100}
                  height={55}
                  />
          </View>

                         <Space height={50}/>

      </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
  )
}

export default Fpassword