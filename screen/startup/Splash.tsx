import React,{useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text,SafeAreaView,Image,ImageBackground} from 'react-native'
import { emages ,colors,FontSize,} from '../../utility/index'
import { useNavigation } from '@react-navigation/native'
import { StorageGet } from '../../service/storage'
const Splash = () => {
  const Navigation=useNavigation();
  useEffect(() => {
    StorageGet('@app_login')
    .then((data)=>{
   if (data == "yes") {
    setTimeout(() => {
      Navigation.navigate('BottomNav');
     }, 4000);
      } else {
        setTimeout(() => {
          Navigation.navigate('Landing');
         }, 4000);
      }
    })
   
  });
  return (
   <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.primary}} >
    
     <View style={{alignItems:"center",borderRadius:100,padding:19,borderWidth:3,borderColor:colors.primary}}>
     <View style={{alignItems:"center",borderRadius:100,padding:29,backgroundColor:"#656fd3"}}>
     <Image source={emages.icon} style={{width:40,height:40,tintColor:colors.white}}/>
       
        
         </View>  
        
         </View>
    
        <StatusBar
            animated={true}
            backgroundColor={colors.white}
            //barStyle="light-content"
            
            />
   
   </View>
  )
}

export default Splash;