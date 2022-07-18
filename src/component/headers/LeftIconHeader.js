import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { titleSmall } from '../../utils/fonts'
import Style from './Style'
import { colors } from '../../utils/colors'
export default function LeftIconHeader({ title, onPress }) {
    return (
        <View style={Style.headerContainer}>
            <TouchableOpacity style={Style.leftWrapper}
                onPress={onPress}
                activeOpacity={0.5}
            >
                <MaterialIcons name="arrow-back-ios" size={24} color={colors.primary200} />
            </TouchableOpacity>
            <View style={Style.centerWrapper}>
                <Text style={[Style.headerText, { color: colors.primary200 }]}>{title}</Text>
            </View>
            <View style={Style.rightWrapper}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})