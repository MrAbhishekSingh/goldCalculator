import {View, Text} from 'react-native';
import React from 'react';
import Navigations from './app/navigation/NavigationContainer';
import {extendTheme, NativeBaseProvider} from 'native-base';
// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigations />
    </NativeBaseProvider>
  );
};

export default App;
