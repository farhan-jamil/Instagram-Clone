import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GlobalStyle from '../../GlobalStyle'
import LabelInput from '../../component/input/LabelInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import PrimaryButton from '../../component/buttons/PrimaryButton'
import PrimaryLoaderButton from '../../component/buttons/PrimaryLoaderButton'
import auth from '@react-native-firebase/auth';
import { bodySmall, subtitleSmall, titleLarge } from '../../utils/fonts'
import { colors } from '../../utils/colors'
import { Divider } from 'react-native-elements'
import Toast from '../Toast'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const loginHandler = () => {
        setLoading(true)
        // navigation.navigate('Home')
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                // Toast('Login Successfully')
                // ToastAndroid.show('Login Successfully', ToastAndroid.SHORT)
            })
            .catch(error => {
                setLoading(false)
                // console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    Toast('That email address is already in use.')
                }

                if (error.code === 'auth/invalid-email') {
                    Toast('Email address is invalid!')
                }
                if (error.code === 'auth/user-not-found') {
                    Toast('User not found')
                }
            });

    }
    return (
        <View style={GlobalStyle.rootContainer}>
            <View style={[{ flex: 0.1, justifyContent: 'center', }, GlobalStyle.paddingHorizontalScreen]}></View>
            <View style={[{ flex: 1, justifyContent: 'center' }, GlobalStyle.paddingHorizontalScreen]}>
                {/* <View style={{ marginTop: hp(6) }} /> */}
                <Text style={[titleLarge, { color: colors.neutral50, textAlign: 'center' }]}>Instagram</Text>
                <View style={{ marginTop: hp(2) }} />
                <LabelInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                />
                <View style={{ marginTop: hp(2) }} />
                <LabelInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => { setPassword(text) }}
                    secureTextEntry={true}
                />
                <View style={{ marginTop: hp(4) }} />
                {
                    loading ?

                        <PrimaryLoaderButton
                            title='Log in'
                        />
                        :
                        <PrimaryButton
                            title='Log in'
                            disabled={password === '' || email === ''}
                            onPress={() => { loginHandler() }}
                        />

                }

                <View >
                    <TouchableOpacity style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={[bodySmall, { color: colors.neutral700, }]}>Forgot your login details? <Text style={[bodySmall, { color: colors.neutral50 }]}>Get help logging in.</Text></Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Divider style={{ backgroundColor: colors.neutral700 }} />

                    </View>
                    <View style={{ marginHorizontal: 12 }}>
                        <Text style={[bodySmall, { color: colors.neutral700 }]} >
                            OR
                        </Text>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Divider style={{ backgroundColor: colors.neutral700 }} />

                    </View>

                </View>
                <View style={{ marginTop: 12 }}>
                    <PrimaryButton
                        title='Continue with Facebook'
                    />
                </View>

            </View>
            <View style={[{ paddingVertical: hp(4) }, GlobalStyle.paddingHorizontalScreen]}>
                <Divider style={{ backgroundColor: colors.neutral700 }} />
                <View style={styles.textNavigation}>
                    <Text style={[bodySmall, { color: colors.neutral700 }]}>Don't have an account?</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={[subtitleSmall, { color: colors.neutral50 }]}> Sign up.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textNavigation: {
        marginTop: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})