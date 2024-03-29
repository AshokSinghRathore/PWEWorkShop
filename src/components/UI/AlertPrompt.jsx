import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';



const AlertPromptModal = ({ visible, onClose, title, placeholder, onSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    const handleConfirm = () => {
        // Do something with the input value
        onSubmit(inputValue);
        setInputValue("");
        onClose();
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{title}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setInputValue}
                        value={inputValue}
                        placeholder={placeholder}
                        maxLength={100}
                        multiline
                    />
                    <View style={styles.buttonContainer}>
                        <CustomButton textStyle={{ fontSize: 15 }} buttonStyle={{ width: "auto", padding: 10, marginTop: 0, height: "auto" }} label={"Confirm"} onPress={handleConfirm} />
                        <CustomButton textStyle={{ fontSize: 15 }} buttonStyle={{ width: "auto", padding: 10, marginTop: 0, height: "auto" }} label={"Cancel"} onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
export default AlertPromptModal