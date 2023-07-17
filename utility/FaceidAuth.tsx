//import liraries
import React, { Component ,useState,useEffect} from 'react';
import { View, Text, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-paper';

// create a component
const FaceidAuth = () => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [fingerprint, setFingerprint] = useState(false);
    const handle = async () => {
        try {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: "Login with Biometrics",
                disableDeviceFallback: true,
                cancelLabel: "Cancel",
            }).then((request)=>{
            // alert(request)
            console.log(request)
            });
            
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
            const enroll = await LocalAuthentication.isEnrolledAsync();
            if (enroll) {
                setFingerprint(true);
            }
        })();
    }, []);
    return (
        <View >
        <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        {isBiometricSupported && fingerprint ? (
            <TouchableOpacity onPress={handle}>
            <Text>Go to home</Text>
            </TouchableOpacity>
        ) : (
            <View>
                <Text>fingerprint not supported/ allocated</Text>
            </View>
        )}
    </View>
</View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default FaceidAuth;
