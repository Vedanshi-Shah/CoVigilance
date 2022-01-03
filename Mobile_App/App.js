import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import Analysis from './screens/Analysis';
import form from './screens/FAQ';
import Vaccination from './screens/Vaccination';
import Subscription from './screens/Subscription';
const AppStack=createStackNavigator();
export default function App() {
  const [isFirstLaunch,setisFirstLaunch]=useState(null);
  useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then(value=>{
      if(value===null){
        AsyncStorage.setItem('alreadyLauched','true');
        setisFirstLaunch(true);
      }else{
        setisFirstLaunch(false);
      }
    });
  },[]);
  if(isFirstLaunch===null){
    return null;
  }else if(isFirstLaunch===true)
  {
    return (
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <AppStack.Screen name="Onboarding" component={OnboardingScreen}/>
          <AppStack.Screen name="Login" component={LoginScreen} />
          <AppStack.Screen name="Register" component={RegisterScreen} />
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Charts" component={Analysis} />
          <AppStack.Screen name="Vaccination" component={Vaccination} />
          <AppStack.Screen name="FAQ" component={form} />
          <AppStack.Screen name="Subscription" component={Subscription} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  } else{
    return <LoginScreen />
  }
}

