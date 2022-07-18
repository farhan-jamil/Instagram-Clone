import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from './utils/colors'

export default StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.neutral900
    },
    paddingHorizontalScreen: {
        paddingHorizontal: wp(2),
    },
    marginTopScreen: {
        marginTop: hp(2)
    },
})