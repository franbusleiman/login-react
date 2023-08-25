import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { useForm } from '../hooks/useForm';
import { styles } from '../themes/loginTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';


interface Props extends NativeStackScreenProps<any, any> { };



export const Register = ({ navigation }: Props) => {

    const {signUp, errorMessage, removeError}=useContext(AuthContext);


    const { email, password, name, onChange } = useForm({ email: '', password: '', name: '' })

    const onRegister = () => {
        signUp({correo:email, password, nombre:name})
        Keyboard.dismiss();
    }

    
    useEffect(()=>{
        if(errorMessage.length===0 )return;
        Alert.alert(
            "Register failed",
            errorMessage,
            [{text:"Ok", onPress:()=>removeError()}]
        )
    },[errorMessage]);


    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#5856D6' }}
            behavior={'height'}>

            <View style={[styles.loginButton, styles.element]}
            >
                <Pressable
                    onPress={() => navigation.navigate("Login")}>
                    <Icon name="arrow-back-outline" size={30} style={{position:'absolute', top:5, left:10}}/>
                </Pressable>
            </View>

            <View style={styles.loginContainer}>

                <Text style={[styles.title, styles.element]}>
                    Register
                </Text>

                <Text style={[styles.label, styles.element]}>
                    Name
                </Text>
                <TextInput
                    placeholder="Ingrese su name:"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="ascii-capable"
                    onChangeText={(value) => onChange(value, "name")}
                    value={name}
                />
                <Text style={[styles.label, styles.element]}>
                    Email
                </Text>
                <TextInput
                    placeholder="Ingrese su email:"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    onChangeText={(value) => onChange(value, "email")}
                    value={email}
                />
                <Text style={[styles.label, styles.element]}>
                    Password
                </Text>
                <TextInput
                    secureTextEntry
                    placeholder="******"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    onChangeText={(value) => onChange(value, "password")}
                    value={password}
                />
                <View>
                    <Pressable
                        style={[styles.button, styles.element]}
                        onPress={() => onRegister()}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                </View>


            </View>
        </KeyboardAvoidingView>
    )
}