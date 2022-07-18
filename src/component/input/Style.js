import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../utils/colors'

export default StyleSheet.create({
    textInputWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#454545',
        paddingHorizontal: 8
    },
    input: {
        flex: 1,
        color: colors.neutral50,
    },
    birthTextFieldInput: {
        borderRadius: 8,
        backgroundColor: colors.neutral50,
        elevation: 2,
        shadowColor: colors.neutral900,
        paddingHorizontal: 8,
        flex: 1
    }
})