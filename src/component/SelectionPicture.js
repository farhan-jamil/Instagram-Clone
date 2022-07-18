import { StyleSheet, Text, View, Modal, TouchableOpacity, } from 'react-native'
import React from 'react'
import { bodyLarge } from '../utils/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {colors} from '../utils/colors'
export default function SelectionPicture({
    visible,
    onClose,
    onCross,
    onGallery,
    onCamera
}) {
    return (
        // <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'yellow', }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.container}>
                    <View style={styles.containerWrapper}>
                        <TouchableOpacity style={styles.itemWrapper} onPress={onCamera}>
                            <Feather name='camera' size={24} color={colors.neutral50} />

                            <Text style={[{ marginLeft: 16, color: colors.neutral50 }, bodyLarge]}>Open Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onGallery} style={styles.itemWrapper}>
                            <MaterialIcons name='photo-library' size={24} color={colors.neutral50} />

                            <Text
                                style={[{ marginLeft: 16, color: colors.neutral50 }, bodyLarge]}>
                                Upload from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCross} style={styles.itemWrapper}>
                            <AntDesign name='close' size={24} color={colors.neutral50} />

                            <Text style={[{ marginLeft: 16, color: colors.neutral50 }, bodyLarge]}>
                                Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'flex-end',
    },
    containerWrapper: {
        backgroundColor: colors.neutral900,
        paddingHorizontal: 16, borderTopLeftRadius: 30, borderTopRightRadius: 30,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16
    }
})