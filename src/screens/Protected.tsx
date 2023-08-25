import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';



interface Props extends NativeStackScreenProps<any, any> { };


export const Protected = ({ navigation }: Props) => {

    const {user, logOut}=React.useContext(AuthContext);

    return (

        <View style={[styles.container]}
        >
            <Pressable
                onPress={() => logOut()}>

                <Text style={[{ color: "black", fontSize:25, position:'relative', top:-200}]}>Logout</Text>
            </Pressable>

            <Text style={[{ color: "black" }]}>
                {JSON.stringify(user, null, 5)}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontSize:20, 
        marginBottom:20
    }
});