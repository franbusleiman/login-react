import React, {useContext, useEffect} from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import { BackGround } from '../components/Background';
import { useForm } from '../hooks/useForm';
import { styles } from '../themes/loginTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';


interface Props extends NativeStackScreenProps<any, any>{};

export const Login = ({navigation}:Props) => {

    const {signIn, errorMessage, removeError}=useContext(AuthContext);

    const { email, password, onChange } = useForm({ email: '', password: '' })

    const onLogin = () => {
        signIn({correo:email, password})
        Keyboard.dismiss();
    }

    useEffect(()=>{
        if(errorMessage.length===0 )return;
        Alert.alert(
            "Login incorrecto",
            errorMessage,
            [{text:"Ok", onPress:()=>removeError()}]
        )
    },[errorMessage]);
    return (
        <View>
            <BackGround />


            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'height'}>

                <View style={styles.loginContainer}>

                    <Text style={[styles.title, styles.element]}>
                        Login
                    </Text>
                    <Text style={[styles.label, styles.element]}>
                        Email
                    </Text>
                    <TextInput
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        onChangeText={(value) => onChange(value, "email")}
                        value={email}
                        onSubmitEditing={onLogin}
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
                        onSubmitEditing={onLogin}

                    />
                    <View>
                        <Pressable
                            style={[styles.button, styles.element]}
                            onPress={() => onLogin()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                    </View>

                    <View style={[styles.registerButton, styles.element]}
                    >
                        <Pressable
                            onPress={() => navigation.replace("Register")}>
                            <Text style={styles.buttonText}>New Account</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}