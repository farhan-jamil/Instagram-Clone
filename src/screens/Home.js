import { StyleSheet, View, FlatList, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostCard from '../component/PostCard'
import GlobalStyle from '../GlobalStyle'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../utils/colors'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { caption } from '../utils/fonts'
import HomeHeader from '../component/headers/HomeHeader'
import { Divider } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
// #ffafbd → #ffc3a0
export default function Home({ navigation }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleted, setDeleted] = useState(false)
    const [usersList, setUsersList] = useState([])
    useEffect(() => {
        fetchUsers()
        fetchPosts()
    }, [])
    const fetchUsers = async () => {
        const users = await firestore().collection('users').get()
        const usersList = users.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }
        )
        // console.log('usersList',)
        setUsersList(usersList.filter((it) => it.id !== auth().currentUser.uid))
    }
    const fetchPosts = async () => {
        // const posts = await firestore().collection('posts').orderBy('postTime', 'desc').get()
        // const postsList = posts.docs.map(doc => {
        //     return {
        //         id: doc.id,
        //         ...doc.data()
        //     }
        // }
        // )
        // setPosts(postsList)
        firestore().collection('posts')
            .orderBy('postTime', 'desc')
            .onSnapshot(onsnapshot => {
                const postsList = onsnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                    //    console.log('querySnapshot', documentSnapshot.data())
                })
                setPosts(postsList)
            })
    }
    // console.log(posts)
    return (
        <View style={GlobalStyle.rootContainer}>
            {/* <Header title='Home' /> */}
            {/* <View style={GlobalStyle.marginTopScreen} /> */}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={posts}
                    ListHeaderComponent={HeaderComponent(usersList)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: hp(2) }}
                    ItemSeparatorComponent={() => <View style={{ height: hp(1) }} />}
                    renderItem={({ item }) => <PostCard item={item}
                        currentUserId={auth().currentUser.uid}
                    // onDelete={deletePostHandler}
                    // onDelete={handleDelete}
                    />}
                />
            </View>
        </View>
    )
}
const HeaderComponent = (usersList) => {
    return (
        <View style={{}}>
            <HomeHeader />
            <FlatList
                data={usersList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[GlobalStyle.paddingHorizontalScreen, { paddingBottom: 8 }]}
                ItemSeparatorComponent={() => <View style={{ marginLeft: 10 }} />}
                renderItem={({ item }) =>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <LinearGradient
                            // colors={['#ffafbd', '#ffc3a0']}
                            colors={['#dd3e54', '#6be585']}
                            // colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                            // style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', width: 200 }}
                            style={styles.imageContainer}
                        >
                            <Image
                                source={{ uri: item.userImage }}
                                style={styles.userImage}
                                resizeMode="contain"
                            />
                        </LinearGradient >
                        <Text style={[caption, { color: colors.neutral50 }]}>
                            {item.fullName}
                        </Text>
                    </View>
                }
            />

            <Divider color={colors.neutral800} />
            <View style={{ marginBottom: 12 }} />
        </View>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        width: 64, height: 64, borderRadius: 64 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: colors.neutral50,
        // borderWidth: 2,
        // borderColor: 'red',
        // backgroundColor: colors.neutral900
    },
    userImage: {
        width: 60, height: 60,
        borderRadius: 60 / 2,
    },

})