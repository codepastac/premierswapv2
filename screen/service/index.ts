import React from 'react'
import http,{ AUTH_ROUTES } from '../../service/api';
import { Alerts } from '../../utility/index';


    export const FetchBalance = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Balance, payload);
        
        } catch (e) {
        
            console.log("ERROR>>>>>>"+e);
        }
    }

    export const CheckPin = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.CheckPin, payload);
        
        } catch (e) {
            //alert(e);
        }
    }

    export const BuyAirime = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Airtime, payload);
        
        } catch (e) {
           // alert(e);
        }
    }
    export const BuyData = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Databuy,payload);
        
        } catch (e) {
            //alert(e);
        }
    }

    export const Cables = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Cable,payload);
        
        } catch (e) {
           // alert(e);
        }
    }
    export const Electricity = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Electricity,payload);
        
        } catch (e) {
            //alert(e);
        }
    }

    export const Acc_details = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Acc_details,payload);
        
        } catch (e) {
           // alert(e);
        }
    }

    export const Educations = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Education,payload);
        
        } catch (e) {
          // alert(e);
        }
    }

    export const Upgrade = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Upgrade,payload);
        
        } catch (e) {
           //alert(e);
        }
    }
    export const CreateAccount= async(payload:any,) => {
        try{
         return await http.post(AUTH_ROUTES.Create_Acct,payload);
        
        } catch (e) {
           //alert(e);
        }
    }

    export const AirtimeConvert = async(payload:any,) => {
        try{
         return await http.post(AUTH_ROUTES.Airtime_convert,payload);
        
        } catch (e) {
           //alert(e);
        }
    }
    export const BuyCoins = async(payload:any,) => {
        try{
         return await http.post(AUTH_ROUTES.BuyCoin,payload);
        
        } catch (e) {
           //alert(e);
        }
    }
    export const SellCoins = async(payload:any,) => {
        try{
         return await http.post(AUTH_ROUTES.SellCoin,payload);
        
        } catch (e) {
           //alert(e);
        }
    }

    export const SellCards = async(payload:any,) => {
        try{
         return await http.post(AUTH_ROUTES.SellCard,payload);
        
        } catch (e) {
           //alert(e);
        }
    }
    export const GetBank= async() => {
        try{
         return await http.get(AUTH_ROUTES.BankList);
        
        } catch (e) {
           //alert(e);
        }
    }

    export const Withdraws= async(payload:any) => {
        try{
            
         return await http.post(AUTH_ROUTES.Withdraw,payload);
        
        } catch (e) {
           //alert(e);
        }
    }

    export const BuyCards= async(payload:any) => {
        try{
            
         return await http.post(AUTH_ROUTES.BuyCard,payload);
        
        } catch (e) {
           //alert(e);
        }
    }

    