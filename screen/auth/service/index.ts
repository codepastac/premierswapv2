import http,{AUTH_ROUTES} from '../../../service/api'
import React from 'react'

    export const RegisterAuth = async(payload:any,) => {
    try{
    return await http.post(AUTH_ROUTES.Register, payload);
        
    } catch (e) {
    console.log("ERROR>>>>>>"+e);
    }
    }

    export const LoginAuth = async(payload:any,) => {
        try{
    return await http.post(AUTH_ROUTES.Login, payload);
        
        } catch (e) {
            console.log("ERROR>>>>>>"+e);
        }
    }

