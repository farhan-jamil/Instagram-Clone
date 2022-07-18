import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { titleLarge } from '../../utils/fonts'
import { colors } from '../../utils/colors'

export default function Header({ title }) {
    return (
        <View style={{
            alignItems: 'center', justifyContent: 'center', 
            backgroundColor: colors.neutral900,
            padding: 4, shadowColor: colors.neutral900, elevation: 5
        }}>
            
            <Text style={[titleLarge, { color: colors.neutral50 }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})