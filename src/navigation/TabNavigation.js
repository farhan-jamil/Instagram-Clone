import { StyleSheet, } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/colors';
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import AddPost from '../screens/AddPost'
import Search from '../screens/Search'
export default function TabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            // activeColor="#e91e63"
            labeled={false}
            barStyle={{
                backgroundColor: colors.neutral900,
                elevation: 5,
                shadowColor: '#000',
                zIndex: 1
            }}
        >
            <Tab.Screen name="Home1" component={Home}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarColor: colors.neutral900,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="home"
                            color={focused ? colors.neutral50 : colors.neutral600}
                            size={24} />
                    ),
                }} />
            <Tab.Screen name="AddPost" component={AddPost}
                options={{
                    // tabBarLabel: 'Home',
                    // tabBarColor: colors.error200,
                    tabBarIcon: ({ color, focused }) => (
                        <Octicons name="diff-added"
                            color={focused ? colors.neutral50 : colors.neutral600}
                            size={24} />
                    ),
                }}
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    // tabBarLabel: 'Home',
                    // tabBarColor: colors.error200,
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="search"
                            color={focused ? colors.neutral50 : colors.neutral600}
                            size={24} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    // tabBarLabel: 'Home',
                    // tabBarColor: colors.error200,
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="user-circle"
                            color={focused ? colors.neutral50 : colors.neutral600}
                            size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})