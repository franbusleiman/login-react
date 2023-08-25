import { ActivityIndicator, View } from "react-native"

export const LoadingScreen = ()=>{

    return (
        <View style={{flex:1, backgroundColor:"white", justifyContent:"center"}}>


            <ActivityIndicator size={50} color="black"/>
        </View>
    )
}