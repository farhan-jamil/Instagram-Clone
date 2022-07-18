import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors';
import { subtitleLarge } from '../../utils/fonts';
import Style from './Style';
export default function PrimaryButton({ title, onPress, disabled }) {
    return (
        <TouchableOpacity style={[Style.container, styles.extendStyle, {
            backgroundColor: disabled ? '#42C2FFaa' : '#007FFF',
        }]}
            disabled={disabled}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[subtitleLarge, { color: colors.neutral50 }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    extendStyle: {
        backgroundColor: '#007FFF'
    }

})