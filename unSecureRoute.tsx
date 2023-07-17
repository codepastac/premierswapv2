import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { Landing,Splash} from './screen/startup/index';
import {
   Join,
  Login,
  Account_created,
  Fpassword,
  Create_passcode,
  Confirm_passcode,
  Create_transfer_pin,
  Confirm_transfer_pin
  } from './screen/auth/index';

const Stack = createNativeStackNavigator();

const UnSecureRoute = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/font/Poppins-Black.ttf'),
    'Poppins-Light': require('./assets/font/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
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
          name="Landing"
          component={Landing}
          options={{title: 'Landing'}}
        />
        <Stack.Screen
          name="Join"
          component={Join}
          options={{title: 'Join'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
         <Stack.Screen
          name="Account_created"
          component={Account_created}
          options={{title: 'Account created'}}
        />
         <Stack.Screen
          name="Fpassword"
          component={Fpassword}
          options={{title: 'Forgot password'}}
        />
          <Stack.Screen
          name="Create_passcode"
          component={Create_passcode}
          options={{title: 'Create passcode'}}
        />
          <Stack.Screen
          name="Confirm_passcode"
          component={Confirm_passcode}
          options={{title: 'Confirm Passcode'}}
        />
         <Stack.Screen
          name="Create_transfer_pin"
          component={Create_transfer_pin}
          options={{title: 'Create transfer pin'}}
        />
         <Stack.Screen
          name="Confirm_transfer_pin"
          component={Confirm_transfer_pin}
          options={{title: 'Confirm transfer pin'}}
        />
       </Stack.Navigator>

    </NavigationContainer>
  );
};

export default UnSecureRoute;