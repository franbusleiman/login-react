import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/components/Navigator';
import { AuthProvider } from './src/context/AuthContext';

 function App() {
  return (
    <NavigationContainer>
      <AppState>
      <Navigator/>
      </AppState>
      </NavigationContainer>
  );
}

export default App;


const AppState=({children}:any)=>{
return <AuthProvider>
  {children}
</AuthProvider>
}