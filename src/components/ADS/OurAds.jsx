import { View, Text, Modal, Linking, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const OurAds = ({ data, onAdd, isRunning, onDelete, isDeleting }) => {

    return (
        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontFamily: "Poppins-SemiBold", color: "white", fontSize: 15 }}>{data?.pincode}</Text>
            {isRunning ?
                <>

                    {isDeleting == data.pathRef ? <ActivityIndicator
                        size={24}
                        color="white"
                    /> : <MaterialCommunityIcons
                        name="delete"
                        onPress={async () => await onDelete(data)}
                        color="#D2042D"
                        size={24} />}
                    <Feather
                        onPress={() => Linking.openURL(data.adUrl)}
                        name="info"
                        color="lime"
                        size={24}
                    />

                </>

                : <AntDesign onPress={onAdd} name="pluscircle" size={24} color="white" />}

        </View>
    )
}
export default OurAds;










































