import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { titleLarge } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import GlobalStyle from '../../GlobalStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function HomeHeader() {
    return (
        <View style={[GlobalStyle.paddingHorizontalScreen, {
            alignItems: 'center', justifyContent: 'space-between',
             padding: 4,
            flexDirection:'row'
        }]}>
            <Text style={[titleLarge, { color: colors.neutral50 }]}>Instagram</Text>
            <MaterialCommunityIcons name='facebook-messenger' size={24} color={colors.neutral50} />
        </View>
    )
}

const styles = StyleSheet.create({})