import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import GlobalStyle from '../../GlobalStyle'
import LabelInput from '../../component/input/LabelInput'
import PrimaryButton from '../../component/buttons/PrimaryButton'
import { bodySmall, caption, subtitleSmall, titleLarge } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { Divider } from 'react-native-elements'
import Toast from '../Toast'
import SelectionPicture from '../../component/SelectionPicture'
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryLoaderButton from '../../component/buttons/PrimaryLoaderButton';
export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userImage, setUserImage] = useState('')

    const [userImageError, setUserImageError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [fullNameError, setFullNameError] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [loading, setLoading] = useState(false)

    const signUpHandler = async () => {

        if (validationHandler()) {
            setLoading(true)
            const imageUrl = await uploadImageHandler()
            try {
                const authUser = await auth().createUserWithEmailAndPassword(email, password)
                console.log('authUser Data=========', authUser)
                await firestore().collection('users').doc(authUser.user.uid).set({
                    owner_uid: authUser.user.uid,
                    userImage: imageUrl,
                    email: email,
                    fullName: fullName,
                    userName: userName,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                }).then((data) => {
                    console.log('res=========', data)
                    setLoading(false)

                })
            }
            catch (error) {
                setLoading(false)
                if (error.code === 'auth/email-already-in-use') {
                    Toast('That email address is already in use.')
                }
                else if (error.code === 'auth/invalid-email') {
                    Toast('Email address is invalid!')
                }
                else if (error.code === 'auth/weak-password') {
                    Toast('Password Should be at least 6 characters')
                }
            }
        }
    }
    const uploadImageHandler = async () => {
        const imageUrl = userImage;
        const fileName = imageUrl.split('/').pop();
        console.log('fileName', fileName)
        const reference = storage().ref('profilePic/' + email);
        try {
            await reference.putFile(userImage)
            const url = await storage().ref(`${reference.path}`).getDownloadURL();
            console.log('url', url)
            return url
        }
        catch (error) {
            console.log('error', error)
            return null
        }

    }
    const validationHandler = () => {
        if (!userImage && !email && !fullName && !userName && !password) {
            setUserImageError('Please select user image')
            setEmailError('Email is required')
            setFullNameError('Name is required')
            setUserNameError('Username is required')
            setPasswordError('Password is required')
        }
        else if (!userImage) {
            setUserImageError('Please select user image')
            return false
        }
        else if (!email) {
            setEmailError('Email is required')
            return false
        }
        else if (!fullName) {
            setFullNameError('Name is required')
            return false
        }
        else if (!userName) {
            setUserNameError('Username is required')
            return false
        }
        else if (!password) {
            setPasswordError('Password is required')
            return false
        }
        else return true
    }
    const galleryHandler = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            // flex: 1,
            cropping: true
        }).then(image => {
            setUserImage(image.path)
            setUserImageError('')
            setModalVisible(false);
        }).catch(e => {
            console.log('User Cancel Image', e);
            setModalVisible(false);
        });
    }
    const cameraHandler = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image => {
            setUserImage(image.path)
            setUserImageError('')
            setModalVisible(false);
        }).catch(e => {
            console.log('User Close Camera', e);
            setModalVisible(false);
        });
    }
    return (
        <View style={GlobalStyle.rootContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                <View style={[{ flex: 0.1, justifyContent: 'center' }, GlobalStyle.paddingHorizontalScreen]}></View>
                <View style={[{ flex: 1, justifyContent: 'center' }, GlobalStyle.paddingHorizontalScreen]}>
                    <Text style={[titleLarge, { color: colors.neutral50, textAlign: 'center' }]}>Instagram</Text>

                    <TouchableOpacity style={[styles.imageContainer, {
                        borderColor: userImageError ? colors.error500 : colors.neutral700
                    }]}
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.6}
                    >
                        {
                            !userImage ?
                                <Feather name="camera" size={30} color={colors.neutral700} />
                                :
                                <Image source={{ uri: userImage }} style={styles.image} />
                        }
                    </TouchableOpacity>
                    <View style={{ marginTop: hp(2) }} />
                    <LabelInput
                        placeholder='Mobile Number or Email'
                        value={email}
                        onChangeText={(text) => { setEmail(text), setEmailError('') }}
                        borderColor={emailError ? colors.error500 : null}
                        borderWidth={emailError ? 1 : 0}
                        errorText={emailError}
                    />
                    <View style={{ marginTop: hp(2) }} />
                    <LabelInput
                        placeholder='Full Name'
                        value={fullName}
                        onChangeText={(text) => { setFullName(text), setFullNameError('') }}
                        borderColor={fullNameError ? colors.error500 : null}
                        borderWidth={fullNameError ? 1 : 0}
                        errorText={fullNameError}
                    />
                    <View style={{ marginTop: hp(2) }} />
                    <LabelInput
                        placeholder='Username'
                        value={userName}
                        onChangeText={(text) => { setUserName(text), setUserNameError('') }}
                        borderColor={userNameError ? colors.error500 : null}
                        borderWidth={userNameError ? 1 : 0}
                        errorText={userNameError}
                    />

                    <View style={{ marginTop: hp(2) }} />
                    <LabelInput
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => { setPassword(text), setPasswordError('') }}
                        secureTextEntry={true}
                        borderColor={passwordError ? colors.error500 : null}
                        borderWidth={passwordError ? 1 : 0}
                        errorText={passwordError}
                    />
                    <View style={{ marginTop: hp(2) }} />
                    <Text style={[caption, { color: colors.neutral50, textAlign: 'center' }]}>
                        People who use our service may have uploaded your contact information to Instagram. Learn More
                    </Text>
                    <View style={{ marginTop: hp(4) }} />
                    {
                        loading ?

                            <PrimaryLoaderButton
                                title='Sign Up'
                            />
                            :
                            <PrimaryButton
                                title='Sign Up'
                                onPress={() => { signUpHandler() }}
                            />
                    }
                </View>
                <View style={[{ paddingVertical: hp(4) }, GlobalStyle.paddingHorizontalScreen]}>
                    <Divider style={{ backgroundColor: colors.neutral700 }} />
                    <View style={styles.textNavigation}>
                        <Text style={[bodySmall, { color: colors.neutral700 }]}>Already have an account?</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={[subtitleSmall, { color: colors.neutral50 }]}> Log in.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SelectionPicture
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onCross={() => setModalVisible(false)}
                    onGallery={() => galleryHandler()}
                    onCamera={() => cameraHandler()}
                />
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignSelf: 'center', borderWidth: 1, borderRadius: 90,
        width: 90, height: 90,
        alignItems: 'center', justifyContent: 'center', marginVertical: 4
    },
    image: {
        width: 90, height: 90,
        borderRadius: 90,
    },
    textNavigation: {
        marginTop: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})