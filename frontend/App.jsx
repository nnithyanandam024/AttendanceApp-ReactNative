
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppLayout from './src/navigation/AppLayout';

const App = () => {
  return (
    <SafeAreaProvider>
      {/* Configure status bar styling */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      
      {/* Main navigation layout */}
      <AppLayout />
    </SafeAreaProvider>
  );
};

export default App;