import React, { createContext, useEffect, useReducer } from "react";
import { cafeApi } from "../api/cafeApi";
import { LoginData, RegisterData, Usuario, UsuarioClass } from "../interfaces/userInterface";
import { AuthState, authReducer } from "./useReducer";
import { Axios, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



type AuthContextProps = {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage: string;
    token: string | null;
    user: UsuarioClass | null;
    signUp: (data:RegisterData) => void;
    signIn: (data: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const AuthInitialState: AuthState = {
    user: null,
    token: null,
    errorMessage: '',
    status: 'checking'

}

export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {


    useEffect(()=>{
        checkTocken();
    }, [])

    const checkTocken= async()=>{
        const token = await AsyncStorage.getItem('token')
        console.log(token)

        if(!token) return dispatcher({type:"notAuthenticated"})

        try{
            const resp = await cafeApi.get<Usuario>("/auth");
        if(resp.status !=200){
            return dispatcher({type:"notAuthenticated"})
        }
        
        dispatcher({type:"signUp",payload:{
            token:resp.data.token, 
            user:resp.data.usuario
        }})}catch(error){
            console.log(getErrorMessage(error as AxiosError));
        }
    }
    const [state, dispatcher] = useReducer(authReducer, AuthInitialState)

    const signUp =  async (registerData: RegisterData) => {

        try {
            const { data } = await cafeApi.post<Usuario>("/usuarios", registerData)

            dispatcher({ type: "signUp", payload: { token: data.token, user: data.usuario } });

            await AsyncStorage.setItem("token", data.token);
        } catch (error) {

            const errorMessage =getErrorMessage(error as AxiosError)
            dispatcher({type:"addError", payload:errorMessage})
        
        }

    };

    const signIn = async (loginData: LoginData) => {

        try {
            const { data } = await cafeApi.post<Usuario>("/auth/login", loginData)

            dispatcher({ type: "signUp", payload: { token: data.token, user: data.usuario } });

            await AsyncStorage.setItem("token", data.token);
        } catch (error) {

            const errorMessage =getErrorMessage(error as AxiosError)
            dispatcher({type:"addError", payload:errorMessage})
        
        }

    };

    const logOut = () => {
        AsyncStorage.removeItem("token")
        dispatcher({ type: "logout" })
    };

    const removeError = () => {
        dispatcher({type:"removeError"})

     };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                logOut,
                removeError
            }}>
            {children}
        </AuthContext.Provider>
    )
}


interface ErrorResponse1 {
    msg: string;
  }
  
  interface ErrorDetail {
    msg: string;
    param: string;
    location: string;
  }
  
  interface ErrorResponse2 {
    errors: ErrorDetail[];
  }
  
  // Function to extract error message from the error response
  function getErrorMessage(error: AxiosError): string {
    if (error.response && error.response.data) {
      const responseData = error.response.data;
  
      if ((responseData as ErrorResponse1).msg) {
        return (responseData as ErrorResponse1).msg;
      } else if ((responseData as ErrorResponse2).errors && (responseData as ErrorResponse2).errors.length > 0) {
        return (responseData as ErrorResponse2).errors[0].msg;
      }
    }
  
    return 'An error occurred';
  }
  
  
  