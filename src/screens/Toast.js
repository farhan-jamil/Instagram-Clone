import { StyleSheet, Platform, ToastAndroid, Alert } from 'react-native'

export default function Toast(msg) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }
    else {
        Alert.alert(msg)
    }

}

const styles = StyleSheet.create({})