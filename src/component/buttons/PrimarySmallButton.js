import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors';
import { subtitleLarge } from '../../utils/fonts';
import Style from './Style';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default function PrimarySmallButton({ title, onPress, loader }) {
    return (
        <TouchableOpacity style={[Style.container, styles.extendStyle,
        { flexDirection: loader ? 'row' : 'column', }
        ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {
                loader &&
                <View style={{ paddingRight: wp(2) }}>
                    <ActivityIndicator size="small" color="#fff" />
                </View>

            }
            <Text style={[subtitleLarge, { color: colors.neutral50 }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    extendStyle: {
        backgroundColor: colors.button,
        borderWidth: 1,
        borderColor: colors.primary200,
        alignSelf: 'baseline'

    }

})