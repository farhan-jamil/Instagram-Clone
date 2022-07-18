import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/authentication/Login';
import SignUp from '../screens/authentication/SignUp';
import TabNavigation from './TabNavigation';
import auth from '@react-native-firebase/auth';
import Home from '../screens/Home';
import AddPost from '../screens/AddPost';
const Stack = createStackNavigator();

export default function StackNavigation() {
    const [loginStatus, setLoginStatus] = useState(null)
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            // console.log('onAuthStateChanged', user)
            if (user) {
                // console.log('user signed in')
                setLoginStatus(true)
            }
            else {
                // console.log('user not signed in')
                setLoginStatus(null)
            }
        })
    }, [])
    return (
        <NavigationContainer>
            {/* <TabNavigation /> */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {!(loginStatus) ?
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </>
                    :
                    <>
                        <Stack.Screen name="Home" component={TabNavigation} />
                        <Stack.Screen name="AddPost" component={AddPost} />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer >
    )
}

const styles = StyleSheet.create({})