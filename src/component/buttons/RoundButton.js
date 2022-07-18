import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors';
import { subtitleLarge } from '../../utils/fonts';
import Style from './Style';
export default function RoundButton({ icon, onPress }) {
    return (
        <TouchableOpacity style={Style.roundButton}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {icon}
            {/* <Text style={[subtitleLarge, { color: colors.primary200 }]}>
                {title}
            </Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})