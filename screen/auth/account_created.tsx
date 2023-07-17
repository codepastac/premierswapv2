import { View, Text, SafeAreaView, ScrollView,Dimensions,Image } from 'react-native'
import React from 'react'
import { colors,FontSize,emages,Btn} from '../../utility'
import { useNavigation } from '@react-navigation/native'
const Account_created = () => {
    const Navigation= useNavigation();
    const windowHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white,}}>
     <ScrollView>
     <View style={{marginTop:50}}/>

     <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white,}}>
    <Text style={{fontFamily:"Poppins-Bold",fontSize:FontSize.normal,top:30,color:colors.primary,textAlign:'center'}}>Account Created🎉</Text>
   
    <Text style={{fontFamily:"Poppins-Regular",fontSize:FontSize.small,top:48,color:colors.primary,textAlign:'center'}}>Your account has been created successfully.
        Press continue to continue using the app</Text>
        <View style={{marginTop:160}}/>
            <Image source={emages.acct_created} />
                 </View>

                <View style={{marginTop:80}}/>
    
                    <View style={{marginLeft:30,marginRight:30}}>
                    <Btn
                  Text="Continue" Btncolor={colors.primary} 
                  onPress={()=>Navigation.navigate('Login')}
                  radius={100}
                  height={55}
                  />
                    </View>
                       
                         <Text style={{fontFamily:"Poppins-Regular",fontSize:FontSize.small,top:10,color:colors.primary,textAlign:'center'}}>By clicking continue, you agree to our
                     </Text>
                    
                    <Text style={{fontFamily:"Poppins-Bold",fontSize:FontSize.small,top:10,color:colors.primary,textAlign:'center'}}>Terms and Conditions
                </Text>
 
            <View style={{marginTop:50}}></View>
          </ScrollView>
   
    </SafeAreaView>
  )
}

export default Account_created;