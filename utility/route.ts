import { useNavigation } from "@react-navigation/native";
import React from "react";
interface Location {
    go:string;
  }
const Routes: React.FC<Location> = (go)=>{
    const Navigation= useNavigation();
    Navigation.navigate('h')
}

export default Routes;