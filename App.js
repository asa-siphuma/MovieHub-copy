import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./frontend/src/Screens/HomePage";
import MainHeader from "./frontend/src/Components/MainHeader";
import CreateAccount from "./frontend/src/Screens/SignUp"; 

const Nav = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Nav.Navigator initialRouteName="CreateAccount">
        <Nav.Screen
          name="CreateAccount"
          component={CreateAccount} 
          options={{ headerShown: false }}
        />
        <Nav.Screen
          name="HomePage"
          component={HomePage}
          options={{ header: () => <MainHeader /> }}
        />
      </Nav.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}