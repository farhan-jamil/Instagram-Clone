import { StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../GlobalStyle'
import Input from '../component/input/Input'
import firestore from '@react-native-firebase/firestore'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../utils/colors'
export default function Search() {
    const [search, setSearch] = useState('')
    const [usersList, setUsersList] = useState([])
    const searchUsers = async () => {
        firestore().collection('users')
            .where('userName', '>=', search)
            .get()
            .then(snapshot => {
                const usersList = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }
                )
                setUsersList(usersList)
                console.log('usersList', usersList)
            }
            )
    }
    // .then(querySnapshot => {
    //     const usersList = querySnapshot.docs.map(doc => {
    //         return {
    //             id: doc.id,
    //             ...doc.data()
    //         }
    //     }
    //     )
    return (
        <View style={[GlobalStyle.rootContainer, GlobalStyle.paddingHorizontalScreen]}>
            <TextInput
                placeholder="Search"
                // value={search}
                onSelectionChange={() => {
                    console.log('selection change')
                }
                }
                onChangeText={(search) => { searchUsers(search) }}
            />
            <FlatList
                data={usersList}
                contentContainerStyle={{
                    paddingVertical: hp('2%'),
                }}
                ItemSeparatorComponent={() => <View style={{ height: hp(2) }} />}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: wp(16), height: wp(16), borderRadius: wp(16) / 2, }}>
                                    <Image
                                        source={{ uri: item.userImage }}
                                        style={{ width: wp(16), height: wp(16), borderRadius: wp(16) / 2, }}
                                    />
                                </View>
                                <View style={{ paddingLeft: wp(3) }}>
                                    <Text style={{ color: colors.neutral50 }}>{item.userName}</Text>
                                    <Text style={{ color: colors.neutral400 }}>{item.fullName}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
                }
                keyExtractor={item => item.id}
            />



        </View>
    )
}

const styles = StyleSheet.create({})