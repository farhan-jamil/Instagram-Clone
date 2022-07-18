import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigation from './src/navigation/StackNavigation'
import Login from './src/screens/authentication/Login'
import SignUp from './src/screens/authentication/SignUp'
import TabNavigation from './src/navigation/TabNavigation'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "1056110040354-k526gt6dgd5tfjblqirm7bh7f7u1q3kl.apps.googleusercontent.com",
    });
  }, [])
  return (
    // <TabNavigation />
    // <Login/>
    // <SignUp />
    <StackNavigation />
  )
}

const styles = StyleSheet.create({})