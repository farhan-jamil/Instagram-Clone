import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../component/headers/Header'
import GlobalStyle from '../GlobalStyle'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../utils/colors'
import PrimarySmallButton from '../component/buttons/PrimarySmallButton'
import LabelInput from '../component/input/LabelInput'
import PrimaryButton from '../component/buttons/PrimaryButton'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { bodySmall, subtitleLarge, subtitleSmall, titleSmall } from '../utils/fonts'
export default function Profile() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [fullNameError, setFullNameError] = useState('')

  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  useEffect(() => {
    const user = auth().currentUser;
    firestore().collection('users').doc(user.uid).onSnapshot(doc => {
      setDisplayName(doc.data().fullName)
      setPhotoURL(doc.data().userImage)
    }
    )
  }
    , [])


  const updateProfileHandler = async () => {
    if (validationHandler()) {
      console.log('updateProfileHandler')
    }
    // navigation.navigate('SignUp')
  }
  const validationHandler = () => {
    if (!email && !password && !fullName) {
      setEmailError('Email is required')
      setPasswordError('Password is required')
      setFullNameError('Name is required')
    }
    else if (!email) {
      setEmailError('Email is required')
      return false
    }
    else if (!password) {
      setPasswordError('Password is required')
      return false
    }
    else if (!fullName) {
      setFullNameError('Name is required')
      return false
    }

    else return true
  }
  const logoutHandler = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(error => console.log('while logout', error.message));
  }
  return (
    <View style={GlobalStyle.rootContainer}>
      <Header title='Profile' />
      <View style={GlobalStyle.marginTopScreen} />
      <ScrollView
        contentContainerStyle={[GlobalStyle.paddingHorizontalScreen, { paddingBottom: hp(2), flexGrow: 1 }]}

      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: photoURL ? photoURL : 'https://thumbs.dreamstime.com/b/nice-to-talk-smart-person-indoor-shot-attractive-interesting-caucasian-guy-smiling-broadly-nice-to-112345489.jpg' }}
                style={styles.userImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[bodySmall, { color: colors.neutral50, marginTop: 4 }]}>{displayName ? displayName : 'Farhan Jamil'}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.9 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[subtitleLarge, { color: colors.neutral50 }]}>0</Text>
              <Text style={[subtitleLarge, { color: colors.neutral50 }]}>Posts</Text>
            </View>
            <View style={{ flex: 1.8, alignItems: 'center', paddingHorizontal: 8 }}>
              <Text style={[subtitleLarge, { color: colors.neutral50 }]}>6</Text>
              <Text style={[subtitleLarge, { color: colors.neutral50 }]}>Followers</Text>
            </View>
            <View style={{ flex: 1.8, alignItems: 'center' }}>
              <Text style={[subtitleLarge, { color: colors.neutral50 }]}>0</Text>
              <Text style={[subtitleLarge, { color: colors.neutral50 }]}>Following</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: colors.neutral700,
          borderRadius: 8,
          padding: 12
        }}
          onPress={logoutHandler}
        >
          <Text style={[titleSmall, { color: colors.neutral50 }]}>Logout</Text>

        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 100, height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100 / 2,
    elevation: 2,
    shadowColor: colors.neutral900
  },
  userImage: {
    width: 100, height: 100,
    borderRadius: 100 / 2,
  },

})