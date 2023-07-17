import { View, Text,SafeAreaView,Image} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { colors,emages,FontSize,Btn,Space} from '../../utility';
import { useNavigation } from '@react-navigation/native';
const Landing = () => {
  const Navigation=useNavigation();
  const Done=()=>{
   return(
   <Btn 
    Text="Next Step" Btncolor={colors.primary} Icon={emages.right}
    onPress={()=>Navigation.navigate('Join')}
    />)
  }
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white,}}>
  
       
       
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.white,flexDirection:'row'}}>
      
      <Onboarding  style={{width:'100%'}}
      DoneButtonComponent={Done}
            pages={[
            {
            backgroundColor:colors.white,
            image: <Image source={emages.onboard1} style={{width:200,height:200,}}/>,
            title:<Text style={{color:colors.primary,fontFamily:'Poppins-Black',fontSize:FontSize.normal,textAlign:"center"}}>Buy Airtime & Data</Text>,
            subtitle: <View style={{width:"90%",alignSelf:"center",}}><Text style={{fontFamily:'Poppins-Light',fontSize:FontSize.small,textAlign:"center"}}>Buy Airtime with Discount, and Cheap Data bundle for all network on Premier Swap NG, very fast without stress.</Text></View>,
            },
            {
              backgroundColor:colors.white,
              image: <Image source={emages.onboard2} style={{width:200,height:200,}}/>,
              title:<Text style={{color:colors.primary,fontFamily:'Poppins-Black',fontSize:FontSize.normal,textAlign:'center',flexShrink: 1}}>Pay Electricity & All Cable Subscription</Text>,
              subtitle: <View style={{width:"90%",alignSelf:"center",}}><Text style={{fontFamily:'Poppins-Light',fontSize:FontSize.small,textAlign:"center"}}>You can Pay electricity bills both prepared and Postpaid, Educational Bills & All cable subscription on Premier Swap NG</Text></View>,
              },
              {
                backgroundColor:colors.white,
                image: <Image source={emages.onboard3} style={{width:200,height:200,}}/>,
                title:<Text style={{color:colors.primary,fontFamily:'Poppins-Black',fontSize:FontSize.normal,top:0,flexShrink: 1}}>Swap Your Airtime to Cash</Text>,
                subtitle: <View style={{width:"90%",alignSelf:"center",}}><Text style={{fontFamily:'Poppins-Light',fontSize:FontSize.small,textAlign:"center"}}>Swap your airtime to cash very easily & Sell your crypto currency & Gift Card for Naira at a good rate & Fast Payment</Text></View>,
             
                },
            ]}
/>
    </View>
    </SafeAreaView>
  )
}

export default Landing;