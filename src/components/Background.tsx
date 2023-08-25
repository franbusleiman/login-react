import React from "react";
import {View} from "react-native"

export const BackGround = ()=>{

    return (
        <View style={{
            position:'absolute',
            backgroundColor:'#5856D6',
            width:900, 
            height:1200,
            top:-350,
            transform:[
                {rotate:'-70deg'}
            ]
        }}>

        </View>
    )
}