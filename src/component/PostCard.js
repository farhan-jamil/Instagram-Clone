import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../utils/colors'
import { bodyLarge, bodySmall, mediumSmall, subtitleLarge } from '../utils/fonts'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment'
import GlobalStyle from '../GlobalStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function PostCard({ item, currentUserId, onDelete }) {
    // console.log('item in post card component', item)
    return (
        <View style={{}}>
            <View style={[GlobalStyle.paddingHorizontalScreen, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.userImage }}
                            style={styles.userImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ marginLeft: wp(2) }}>
                        <Text style={[bodyLarge, { color: colors.neutral50 }]}>{item.userName}</Text>
                    </View>

                </View>

                <SimpleLineIcons name='options' size={24} color={colors.neutral50} />

            </View>
            {
                item?.post ?
                    <View style={{ marginLeft: wp(2), paddingTop: wp(2) }}>
                        <Text style={[bodyLarge, { color: colors.neutral50 }]}>{item?.post}</Text>
                    </View>
                    :
                    null
            }

            {item.postImg &&
                <View style={styles.postImageContainer}>
                    {/* source={{ uri: 'https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000' }} */}
                    < Image
                        source={{ uri: item.postImg }}
                        // style={{ width: '100%', height: '100%' }}
                        style={{ width: '100%', height: '100%' }}
                    // resizeMode="contain"
                    // resizeMethod="scale"
                    />
                </View>
            }
            <View style={[GlobalStyle.paddingHorizontalScreen, {}]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity activeOpacity={0.8}
                        >
                            <AntDesign name='hearto' size={24} color={colors.neutral50} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Feather name='message-circle' size={24} color={colors.neutral50}
                                style={{ transform: [{ rotate: '270deg' }], marginLeft: wp(5) }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Feather name='send' size={24} color={colors.neutral50}
                                style={{ transform: [{ rotate: '20deg' }], marginLeft: wp(5) }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Feather name='bookmark' size={24} color={colors.neutral50}
                        />
                    </View>
                    {/* {
                    item.userId === currentUserId &&

                    <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}
                        onPress={() => onDelete(item.id)}
                    >
                        <Ionicons name='ios-trash' size={24} color={colors.neutral700} />
                    </TouchableOpacity>
                } */}
                </View>
                <View>
                    <Text style={[bodySmall, { color: colors.neutral600, marginTop: wp(1) }]}>O likes</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[mediumSmall, { color: colors.neutral100, }]}>Farhan Jamil</Text>
                        <Text
                            numberOfLines={2}
                            style={[bodySmall, { color: colors.neutral50, marginLeft: 8 }]}>1st Comment</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Text style={[bodySmall, { color: '#0996FC' }]}>View all 200 comments</Text>
                    </TouchableOpacity>
                    {/* <Text style={[bodySmall, { color: colors.neutral400 }]}>Dec 22,2021</Text> */}
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({

    imageContainer: {
        width: 40, height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: colors.neutral900
    },
    userImage: {
        width: 40, height: 40,
        borderRadius: 40 / 2,
    },
    postImageContainer: {
        width: '100%',
        // height: hp(60),
        // width: 500, height: 500,
        aspectRatio: 1 / 1,
        elevation: 2, shadowColor: colors.neutral900, marginVertical: hp(1),
    },
    actionButton: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        padding: 12, borderWidth: 1,
        borderColor: colors.neutral700
    }
})