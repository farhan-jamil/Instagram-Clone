import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../utils/colors'

export default StyleSheet.create({
    headerContainer: {
        elevation: 2,
        backgroundColor: colors.neutral100,
        shadowColor: colors.neutral900,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        zIndex: 1
    },
    leftWrapper: {
        flex: 0.2
    },
    centerWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightWrapper: {
        flex: 0.2,
        alignItems: 'flex-end'
    },
    headerText: {
        fontFamily: 'poppins.semibold',
        fontSize: 18
    }
})