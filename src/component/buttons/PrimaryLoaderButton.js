import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors';
import { subtitleLarge } from '../../utils/fonts';
import Style from './Style';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default function PrimaryLoaderButton({ title, onPress, disabled }) {
    return (
        <TouchableOpacity style={[Style.container, styles.extendStyle, {
            backgroundColor: disabled ? '#42C2FFaa' : '#007FFF',
            flexDirection: 'row',
        }]}
            disabled={disabled}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <ActivityIndicator size="small" color="#fff" />
            <Text style={[subtitleLarge, { color: colors.neutral50, paddingLeft: wp(2), }]}>
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