import { View, Text, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import CustomButton from '../UI/CustomButton'
import CustomTextInput from '../UI/CustomTextInput'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from "@react-native-firebase/storage"
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux'
import { updateServicePinCode } from '../../feature/all-feature/feature-servicepincode'
const AddForm = ({ isVisible, closeModal, data }) => {
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [pickerLoader, setPickerLoader] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState({});
    const [submitLoader, setSubmitLoader] = useState(false);
    const Dispatch = useDispatch()
    async function openGallery() {
        if (pickerLoader || submitLoader) return;
        setPickerLoader(true);
        try {
            const resp = await launchImageLibrary({
                quality: 0.7,
                mediaType: "video",
                selectionLimit: 1,
                presentationStyle: "popover",
                videoQuality: "medium",
            })
            if (resp.assets && resp.assets.length > 0 && resp.assets[0]?.uri) {
                const respVideo = resp.assets[0];
                if (respVideo.duration <= 10) {
                    if (respVideo.fileSize <= 10 * 1024 * 1024) {
                        setSelectedVideo(respVideo);

                    } else {
                        Alert.alert("Video Size Exceeded", "Video size should be less than 10 MB");
                    }
                } else {
                    Alert.alert("Video Duration Exceeded", "Video duration should be less than 10 seconds");
                }
            }

        } catch (error) {
            console.log(error)
            Alert.alert("Can't Open Picker", "Please try again");
        }
        setPickerLoader(false);
    }

    async function onSubmit() {
        if (pickerLoader || submitLoader) return;
        setSubmitLoader(true);
        try {
            const resp = await storage().ref(`Ads/${data.pincode}/${selectedVideo?.fileName}` + new Date().toISOString()).putFile(selectedVideo?.uri);
            const url = await storage().ref(resp.metadata.fullPath).getDownloadURL();
            const uploadData = {
                adUrl: url.split("&token")[0],
                websiteUrl: websiteUrl
            }

            await firestore().doc(data.pathRef).update(uploadData);
            Dispatch(updateServicePinCode({
                ...data,
                ...uploadData
            }))
            closeModal()
            setSelectedVideo({})
            setWebsiteUrl("")
            setSubmitLoader(false)
            setPickerLoader(false)

        } catch (error) {
            console.log(error)
            Alert.alert("Something went Wrong", "Please Try Again Later");
        }
        setSubmitLoader(false);
    }
    useEffect(()=>{
        setSelectedVideo({})
        setWebsiteUrl("")
        setSubmitLoader(false)
        setPickerLoader(false)
    },[])
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        width: "80%",
                        borderRadius: 10,
                        padding: 10,
                    }}
                >
                    <MaterialIcons
                        name="cancel"
                        size={30}
                        color="black"
                        onPress={closeModal}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                    />

                    <Text
                        style={{
                            color: "black",
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 20,
                        }}

                    >
                        Add Form {data.pincode}
                    </Text>
                    <View style={{ marginVertical: 20 }}>
                        <TouchableOpacity
                            onPress={openGallery}
                            style={{
                                backgroundColor: "", alignSelf
                                    : "center", alignItems: "center",
                                justifyContent: "space-between", flexDirection: "row",
                                borderWidth: 0.4,
                                borderColor: "grey",
                                padding: 10,
                                borderRadius: 8,
                                width: "80%"
                            }}>
                            <Text style={{ color: "black", fontFamily: "Poppins-SemiBold" }}>{selectedVideo && selectedVideo?.fileName ? selectedVideo
                                .fileName.substring(0, 20) : "Select Video"}</Text>
                            {pickerLoader ? <ActivityIndicator size={20} color={"black"} /> : <Feather name="upload" size={20} color="black" />}
                        </TouchableOpacity>
                        <CustomTextInput
                            Style={{
                                width: "80%",

                                marginTop: 20,
                                marginBottom: 10,
                                backgroundColor: "#e8f7ee",
                            }}
                            value={websiteUrl}
                            placeHolder={"Ad Url (OPTIONAL)"}
                            placeHolderColor={"black"}
                            onChangeText={(e) => setWebsiteUrl(e)}
                        />
                        <CustomButton
                            showLoader={submitLoader}
                            onPress={onSubmit}
                            buttonStyle={{ marginTop: 10 }}
                            label={"Submit"} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddForm