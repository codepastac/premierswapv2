import React, {
    Component,
  } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    Platform,
  } from 'react-native';
  import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';

  interface  StatusbarProps{
    backgroundColors: any,
    barStyle:any
  }
const StatusBars:React.FC<StatusbarProps> = ({backgroundColors,barStyle = "light-content"})=>{
     
     const insets = useSafeAreaInsets();
  
     return (
       <View style={{ height: insets.top, backgroundColor: backgroundColors }}>
          <StatusBar
            animated={true}
            backgroundColor={backgroundColors}
            barStyle="light-content"
            
            />
       </View>
     );
  }



  export default StatusBars