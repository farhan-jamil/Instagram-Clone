import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import GlobalStyle from '../GlobalStyle'
import Input from '../component/input/Input'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../utils/colors'
import PrimarySmallButton from '../component/buttons/PrimarySmallButton';
import ImagePicker from 'react-native-image-crop-picker';
import { ActivityIndicator } from 'react-native-paper';
import { FAB, Portal, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { caption } from '../utils/fonts';
import Toast from './Toast'
export default function AddPost({ navigation }) {
  const [post, setPost] = useState('')
  const [imageSource, setImageSource] = useState('')
  const [transferred, setTransferred] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState('')

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getUsername()
  }, [])
  const getUsername = () => {
    const user = firebase.auth().currentUser;
    // const unsubscribe=firestore().collection('users')
    // .where('owner_uid', '==', user.uid).limit(1).onSnapshot(snapshot => {
    //   snapshot.forEach(doc => {
    //     console.log('doc', doc.data())
    //     // setUsername(doc.data().username)
    //   })
    // }
    // )
    const unsubscribe = firestore().collection('users').doc(user.uid).onSnapshot(doc => {
      console.log('doc', doc.data())
      setUserImage(doc.data().userImage)
      setUserName(doc.data().fullName)
      // console.log(doc.data().username)
    }
    )
  }
  const submitPostHandler = async () => {
    const user = firebase.auth().currentUser;

    if (imageSource == '') {
      // console.log('imageSource', imageSource)
      // console.log('post', post)
      Toast('Please add Image')
    }
    else {
      setLoading(true)
      const imageUrl = await uploadImageHandler()
      firestore().collection('posts').add({
        userId: auth().currentUser.uid,
        post: post,
        postImg: imageUrl,
        userName: userName,
        userImage: userImage,
        // postTime: firestore.Timestamp.fromDate(new Date()),
        postTime: firestore.FieldValue.serverTimestamp(),
        likes: null,
        comments: null,
      })
        .then(() => {
          console.log('post added')
          setLoading(false)
          // Alert.alert(
          //   'Post published',
          //   'Your post has been published Successfully',
          // )
          setPost('')
          setImageSource('')
          Toast('Post Published')
          // navigation.replace('Home')
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          Toast('Post Not Published')
        })
    }
  }
  const uploadImageHandler = async () => {
    if (imageSource === '') {
      console.log('imageSource in if', imageSource)
      return null
    }
    else {
      console.log('imageSource in else', imageSource)
      console.log('imageSource in else', imageSource.split('/').pop())
      let imageName = imageSource.split('/').pop();
      let fileName = storage().ref('posts/' + `${auth().currentUser.uid}/` + imageName);
      // console.log('fileName', fileName)
      await fileName.putFile(imageSource)
      const url = await storage().ref(`${fileName.path}`).getDownloadURL();
      console.log('url', url)
      return url
      // console.log('imageSource in else', imageSource.split('/').pop().split('?')[0])
      // // the image is overide if it has been uploaded before
      // // for this we add timestamp to file name
      // setUploading(true)
      // // console.log('submitPostHandler')
      // const uploadUri = imageSource;
      // // // both have same output  
      // let filename = uploadUri.split('/').pop();
      // // console.log(' before filename', filename)
      // // filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      // // console.log(' after filename', filename)
      // // add timestamp to file name
      // const extension = uploadUri.split('.').pop();
      // const name = filename.split('.').slice(0, -1).join('.')
      // filename = name + Date.now() + '.' + extension;
      // const storageRef = storage().ref(`photos/${filename}`);
      // const task = storageRef.putFile(uploadUri);

      // task.on('state_changed', taskSnapshot => {
      //   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      //   setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100))
      // });

      // try {
      //   await task;
      //   const url = await storageRef.getDownloadURL();
      //   console.log('uploaded')
      //   setUploading(false)
      //   return url
      // }
      // catch (error) {
      //   console.log('error', error)
      //   return null
      // }
    }
  }
  const galleryImageHandler = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      setImageSource(image.path)
      // setImageSource({ path: image.path, type: image.mime })
    }).catch(e => {
      console.log('User Cancel Image', e)
    })
  }
  const cameraImageHandler = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      setImageSource(image.path)
      // setImageSource({ path: image.path, type: image.mime })
    }).catch(e => {
      console.log('User Cancel Image', e)
    })
  }
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <View style={GlobalStyle.rootContainer}>

      <View style={[GlobalStyle.paddingHorizontalScreen, { justifyContent: 'center', flex: 1, }]}>
        {/* <View style={{ width: '100%', height: 250, backgroundColor: 'red', elevation: 2, shadowColor: colors.neutral900 }}>
          <Image
            source={imageSource ? { uri: imageSource } : DefaultImage}
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </View> */}
        {
          !(imageSource === '') ?

            <View style={{
              width: '100%',
              // height: hp(55),
              aspectRatio: 1,
              elevation: 2, shadowColor: colors.neutral900
            }}>
              <Image
                source={{ uri: imageSource }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='cover'
              />
            </View>
            : null
        }
        <View style={{ marginTop: hp(2) }} />
        <Input
          placeholder='Enter About Your Post'
          value={post}
          onChangeText={(text) => { setPost(text) }}
        />
        <View style={{ marginTop: hp(2) }} />
        {uploading ?
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator size='small' color={colors.primary200} />
            <Text style={[caption, { color: colors.neutral900 }]}>{transferred} % Completed</Text>
          </View>
          :
          <View style={{ alignSelf: 'center' }}>
            <PrimarySmallButton
              title='Add Post'
              loader={loading}
              onPress={() => { submitPostHandler() }}
            />
          </View>

        }
        {/* <Provider>
          <Portal> */}
        <FAB.Group
          // style={styles.fab}
          fabStyle={{ backgroundColor: colors.button }}
          open={open}
          icon={open ? 'close' : 'plus'}
          color={colors.neutral50}
          actions={[
            // { icon: 'plus', onPress: () => console.log('Pressed add') },
            // {
            //   icon: 'star',
            //   label: 'Star',
            //   labelStyle: {
            //     fontSize: 20,
            //   },
            //   onPress: () => console.log('Pressed star'),
            // },
            {
              icon: 'camera',
              label: 'Take Photo',
              color: colors.primary50,
              style: { backgroundColor: colors.button, },
              onPress: () => cameraImageHandler(),
            },
            {
              icon: { name: 'photo-library', type: 'material-community' },
              label: 'Choose Photo',
              color: colors.primary50,
              style: { backgroundColor: colors.button, },
              onPress: () => galleryImageHandler(),
              // small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              console.log('do something if the speed dial is open ......', open);
              // do something if the speed dial is open
            }
          }}
        />
        {/* </Portal>
        </Provider> */}
      </View>
      <View style={GlobalStyle.marginTopScreen} />
    </View>
  )
}

const styles = StyleSheet.create({

  // fab: {
  //   position: 'absolute',
  //   margin: 16,
  //   right: 0,
  //   bottom: 0,
  //   // backgroundColor:'red'
  //   // backgroundColor: '#FFFFFFaa',
  //   // fontFamily: 'Roboto',
  //   // fontSize: 20,
  // },

})