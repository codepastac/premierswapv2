import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { HomeScreen,
  BottomNav,
  AirtimeScreen,PaymentSuccess,DataScreen,AllBills,
  Cable,
  Education,
  Elec,
  SettingScreen,
  AddBvn,
  AddMoney,
  TradeScreen,
  Airtime2Cash,
  BuyCoin,
  SellCoin,
  SellGiftCard,
  TransferScreen,
  ManageScreen,
  Faq,
  BuyGiftCard,
  ProfilePicture,
  EStatement
  } from './screen/main/index';
  import { Splash} from './screen/startup/index';
  import Demo from './voice/Demo';
//import { Header } from 'react-native/Libraries/NewAppScreen';
const Stack = createNativeStackNavigator();

const SecureRoute = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/font/Poppins-Black.ttf'),
    'Poppins-Light': require('./assets/font/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/font/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/font/Poppins-Medium.ttf'),
    'DMSans-Medium': require('./assets/font/DMsansFont/DMSans-Medium.ttf'),
    'DMSans-Bold': require('./assets/font/DMsansFont/DMSans-Bold.ttf'),
     
    });
  if(!fontsLoaded){
    return;
  }
  return (

    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        headerLeft: ()=> null,
        gestureEnabled: false
      }}
      
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{title: 'Startup'}}
        />

        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{title: 'HomeScreen'}}
        />
         <Stack.Screen
          name="AirtimeScreen"
          component={AirtimeScreen}
          options={{title: 'AirtimeScreen'}}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={{title: 'PaymentSuccess'}}
        />
          <Stack.Screen
          name="DataScreen"
          component={DataScreen}
          options={{title: 'DataScreen'}}
        />
          <Stack.Screen
          name="Allbills"
          component={AllBills}
          options={{title: 'All Bills'}}
        />
         <Stack.Screen
          name="Cable"
          component={Cable}
          options={{title: 'Cable Subscription'}}
        />
         <Stack.Screen
          name="Elec"
          component={Elec}
          options={{title: 'Electricity Subscription'}}
        />
         <Stack.Screen
          name="Education"
          component={Education}
          options={{title: 'Education'}}
        />
          <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={{title: 'Settings'}}
        />
         <Stack.Screen
          name="AddBvn"
          component={AddBvn}
          options={{title: 'AddBvn'}}
        />
        <Stack.Screen
          name="AddMoney"
          component={AddMoney}
          options={{title: 'Fund Account'}}
        />
          <Stack.Screen
          name="Demo"
          component={Demo}
          options={{title: 'demo'}}
        />
           <Stack.Screen
          name="TradeScreen"
          component={TradeScreen}
          options={{title: 'TradeScreen'}}
        />
         <Stack.Screen
          name="Airtime2Cash"
          component={Airtime2Cash}
          options={{title: 'Trade Airtime 2 Cash'}}
        />
         <Stack.Screen
          name="BuyCoin"
          component={BuyCoin}
          options={{title: 'BuyCoin'}}
        />
          <Stack.Screen
          name="SellCoin"
          component={SellCoin}
          options={{title: 'SellCoin'}}
        />
        <Stack.Screen
          name="SellCard"
          component={SellGiftCard}
          options={{title: 'Sell Giftcard'}}
        />
         <Stack.Screen
          name="TransferScreen"
          component={TransferScreen}
          options={{title: 'Transfer Screen'}}
        />
         <Stack.Screen
          name="ManageScreen"
          component={ManageScreen}
          options={{title: 'Manage Screen'}}
        />
         <Stack.Screen
          name="HeaderWeb"
          component={Faq}
          options={{title: ''}}
        />
         <Stack.Screen
          name="BuyGiftCard"
          component={BuyGiftCard}
          options={{title: 'Buy Gift Card'}}
        />
          <Stack.Screen
          name="ProfilePic"
          component={ProfilePicture}
          options={{title: 'ProfilePicture'}}
        />
        <Stack.Screen
          name="EStatement"
          component={EStatement}
          options={{title: 'EStatement'}}
        />
       </Stack.Navigator>
       

    </NavigationContainer>
  );
};

export default SecureRoute;