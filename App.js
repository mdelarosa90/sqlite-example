import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './pages/HomeScreen';
import ViewUser from './pages/ViewUser';
import UpdateUser from './pages/UpdateUser';
import RegisterUser from './pages/RegisterUser';
import DeleteUser from './pages/DeleteUser';
import ViewAllUser from './pages/ViewAllUser';

const Stack = createStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Home" options={{title: 'Home Screen'}} component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="View"  options={{title: 'View User'}} component={ViewUser}></Stack.Screen>
      <Stack.Screen name="ViewAll"  options={{title: 'View All User'}} component={ViewAllUser}></Stack.Screen>
      <Stack.Screen name="Update"  options={{title: 'Update User'}} component={UpdateUser}></Stack.Screen>
      <Stack.Screen name="Register"  options={{title: 'Register User'}} component={RegisterUser}></Stack.Screen>
      <Stack.Screen name="Delete"  options={{title: 'Delete User'}} component={DeleteUser}></Stack.Screen>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
