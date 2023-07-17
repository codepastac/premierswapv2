import * as React from 'react';
import { StyleSheet,Text,Image, View } from 'react-native';
import { BottomNavigation, Avatar } from 'react-native-paper';
import { emages,colors } from '../../utility';
import {
  HomeScreen,
    StatisticScreen,
    NotificationScreen,
    ProfileScreen,
    TransferScreen
  
  } from './index';
    import { MaterialIcons } from '@expo/vector-icons';
    import {
      AnimatedTabBarNavigator,
      DotSize, // optional
      TabElementDisplayOptions, // optional
      TabButtonLayout, // optional
      IAppearanceOptions // optional
    } from 'react-native-animated-nav-tab-bar'
    import { Feather,Octicons,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';

const BottomNav = () => {
  const Tabs = AnimatedTabBarNavigator();

  return (
    <Tabs.Navigator
    
    tabBarOptions={{
      activeTintColor:colors.primary,
      inactiveTintColor: "grey",
      activeBackgroundColor:colors.primaryLight,
      
    }}
    appearance={{
      shadow:true,
      //floating:true
    }}
  >
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
         <Image source={emages.icon} style={{width:size,height:size,tintColor:color}}/>
        )
      }}
    />
    <Tabs.Screen
      name="Transaction"
      component={NotificationScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
           
            <Octicons name="history"  
            size={size ? size : 24}
            color={focused ? color : "#222222"}
            focused={focused}
            color={color}
            />
        )
      }}
    />
      <Tabs.Screen
      name="Referral"
      component={StatisticScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
           
            <Ionicons name="gift-outline"  
            size={size ? size : 24}
            color={focused ? color : "#222222"}
            focused={focused}
            color={color}
            />
        )
      }}
    />
     <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
           
            <AntDesign name="meh"  
            size={size ? size : 24}
            color={focused ? color : "#222222"}
            focused={focused}
            color={color}
            />
        )
      }}
    />
    </Tabs.Navigator>
  );
};

export default BottomNav;