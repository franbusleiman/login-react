import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Protected } from '../screens/Protected';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

export  const Navigator=()=> {

    const {status}=useContext(AuthContext);


    if(status==="checking") return <LoadingScreen></LoadingScreen>

  return (
    <Stack.Navigator
    screenOptions={
        {
            headerShown: false
        }
    }>

    {
        (status !== "authenticated")?
        <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        </>
        :
        <Stack.Screen name="Protected" component={Protected} />

    }
     
    </Stack.Navigator>
  );
}