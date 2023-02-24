import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllBils from '../screen/AllBils';
import CreateBill from '../screen/Home';

const Stack = createNativeStackNavigator();

function Navigations() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="All Bills"
        screenOptions={
          {
            // headerShown: false,
          }
        }>
        <Stack.Screen name="All Bills" component={AllBils} />
        <Stack.Screen name="Create Bill" component={CreateBill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigations;
