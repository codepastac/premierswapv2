
import { Feather } from '@expo/vector-icons';
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FaceidAuth } from '../utility';

// create a component
const Demo = () => {
      return(
        <View style={styles.container}>
        <FaceidAuth/>
        
        </View>
      );
  };
 
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Demo;
