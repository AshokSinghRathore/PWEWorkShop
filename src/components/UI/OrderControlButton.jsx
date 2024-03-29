import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { orderStatus } from '../../constants/constant';
const OrderControlButton = ({ onCross, onCheck, onPress, label, status }) => {
    return (
        <View style={style.container}>
            <View style={{ flexDirection: "row" }}>

                {status == orderStatus[1] ? <>

                    <Pressable onPress={onCross} style={style.buttonContainer}>
                        <EvilIcons name="close" size={24} style={{ top: -2 }} color="red" />
                    </Pressable>
                    <Pressable onPress={onCheck} style={[style.buttonContainer, { marginLeft: 10 }]}>
                        <MaterialCommunityIcons name="check" size={22} style={{}} color="green" />
                    </Pressable>
                </>
                    : <View style={{
                        backgroundColor: status == orderStatus[1] ? "goldenrod" : status == orderStatus[2] ? "green" : "red",
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 6,
                        paddingVertical: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text
                            style={{ marginTop: 0, fontSize: 15, fontFamily: "Poppins-SemiBold", color: "white" }}>
                            {status}
                        </Text>
                    </View>

                }
            </View>
            <TouchableOpacity
                onPress={onPress}
                style={style.viewButton}>
                <Text style={style.viewButtonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OrderControlButton

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 8,
        padding: 2,
        height: 50
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        backgroundColor: "white",
        heigh: 50,
        borderRadius: 25,
        width: 50
    },
    viewButton: {
        padding: 10,
        borderWidth: 1,
        width: 150,
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: 'black',
        marginLeft: 10
    },
    viewButtonText: {
        textAlign: 'right',
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },
})