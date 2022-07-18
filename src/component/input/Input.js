import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { textInputLabel, textInputText, bodySmall } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import Style from './Style'
export default function Input({
    label,
    placeholder,
    value,
    onChangeText,
    borderColor,
    borderWidth,
    editable,
    secureTextEntry,
    errorText
}) {
    return (
        <View style={{}}>
            {/* <Text style={[textInputLabel, { color: colors.neutral900 }]}>{label}</Text> */}
            <View style={[Style.textInputWrapper, {
                borderWidth: borderWidth,
                borderColor: borderColor,
            }]}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                    placeholderTextColor={colors.neutral600}
                    style={[Style.input, textInputText]}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize='none'
                />
            </View>
            {
                errorText ?
                    <Text style={[bodySmall, { color: colors.error500 }]}>{errorText}</Text>
                    : null
                // !(errorText?.length === 0) && (
                //     <Text style={[caption, { color: colors.error500 }]}>{errorText}</Text>
                // )
            }
        </View>
    )
}

const styles = StyleSheet.create({})