import { StyleSheet } from 'react-native'
import { colors } from '../../utils/colors'

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    roundButton: {
        // backgroundColor: 'yellow',
        backgroundColor: colors.neutral250,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center', justifyContent: 'center',
        elevation: 2,
        shadowColor: colors.neutral900,
    }

})