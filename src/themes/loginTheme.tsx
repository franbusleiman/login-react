import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title:{
        alignSelf:"center",
        color:"white",
        fontWeight:"bold",
        fontSize:30,
        marginVertical:50
    },
    loginContainer:{
        paddingHorizontal:30,
        height:600,
        marginBottom:50,
        justifyContent:"center"
    },
    label:{
        color:"white",
        fontWeight:"bold",
        fontSize:20 
    },
    buttonText:{
        fontSize:19, 
        color:"white"
    },
    button:{
        alignItems:"center",
        width:150,
        borderColor:"white",
        borderRadius:100, 
        borderWidth:2, 
        paddingHorizontal:20, 
        paddingVertical:10,
        alignSelf:"center"
    },
    registerButton:{
        alignSelf:"flex-end"
    },
    loginButton:{
        alignSelf:"flex-start"
    },
    element:{
        marginTop:15
    }
});