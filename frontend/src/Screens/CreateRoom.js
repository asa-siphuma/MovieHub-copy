import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalSelector from 'react-native-modal-selector';

const CreateRoomScreen = ({ route }) => {
    const navigation = useNavigation();
    const { onRoomCreate } = route.params;
    const { userInfo } = route.params;
    const [roomTitle, setRoomTitle] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [accessLevel, setAccessLevel] = useState("Everyone");
    const [roomType, setRoomType] = useState("Chat-only");
    const [watchParty, setWatchParty] = useState(false);

    const accessLevelOptions = [
        { key: 0, label: 'Everyone' },
        { key: 1, label: 'Invite only' },
        { key: 2, label: 'Followers' }
    ];

    const roomTypeOptions = [
        { key: 0, label: 'Chat-only' },
        { key: 1, label: 'Audio and chat' }
    ];

    const handleCreateRoom = () => {
        onRoomCreate({ roomTitle, accessLevel, roomType, watchParty });
        navigation.navigate("HubScreen", { userInfo: route.params.userInfo });
    };

    const isButtonDisabled = roomTitle === "" || roomDescription === "";

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{ marginRight: 35 }} onPress={() => navigation.goBack()}>
                    <MatIcon name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Create Room</Text>
            </View>

            <Text style={styles.label}>Room Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={roomTitle}
                onChangeText={setRoomTitle}
            />

            <Text style={styles.label}>Room Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={roomDescription}
                onChangeText={setRoomDescription}
            />

            <Text style={styles.label}>Max Participants</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                value={maxParticipants}
                onChangeText={setMaxParticipants}
            />

            <Text style={styles.label}>Access Level</Text>
            <View style={styles.pickerContainer}>
                <ModalSelector
                    data={accessLevelOptions}
                    initValue={accessLevel}
                    onChange={(option) => setAccessLevel(option.label)}
                    style={styles.modalSelector}
                    selectStyle={styles.selectStyle}
                    selectTextStyle={styles.selectText}
                    optionTextStyle={styles.optionText}
                    optionStyle={styles.optionStyle}
                    optionContainerStyle={styles.optionContainer}
                    cancelStyle={styles.cancelStyle}
                    cancelTextStyle={styles.cancelTextStyle}
                    initValueTextStyle={styles.initValueTextStyle}
                />
            </View>

            <Text style={styles.label}>Room Type</Text>
            <View style={styles.pickerContainer}>
                <ModalSelector
                    data={roomTypeOptions}
                    initValue={roomType}
                    onChange={(option) => setRoomType(option.label)}
                    style={styles.modalSelector}
                    selectStyle={styles.selectStyle}
                    selectTextStyle={styles.selectText}
                    optionTextStyle={styles.optionText}
                    optionStyle={styles.optionStyle}
                    optionContainerStyle={styles.optionContainer}
                    cancelStyle={styles.cancelStyle}
                    cancelTextStyle={styles.cancelTextStyle}
                    initValueTextStyle={styles.initValueTextStyle}
                />
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Watch Party</Text>
                <Switch
                    value={watchParty}
                    onValueChange={setWatchParty}
                    trackColor={{ false: "#767577", true: "#2C2A6F" }}
                    thumbColor={watchParty ? "#4A42C0" : "#f4f3f4"}
                />
            </View>

            <TouchableOpacity style={[styles.createButton, isButtonDisabled ? styles.disabledButton : null]} onPress={handleCreateRoom} disabled={isButtonDisabled}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        height: 40,
    },
    title: {
        fontSize: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: "#D9D9D9",
        borderRadius: 5,
        marginBottom: 15,
    },
    pickerContainer: {
        width: "100%",
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "#D9D9D9",
        marginBottom: 15,
    },
    modalSelector: {
        width: "100%",
    },
    initValueTextStyle: {
        color: "#000",
        fontSize: 14
    },
    selectStyle: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        // backgroundColor: "#D9D9D9",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectText: {
        color: "#fff",
    },
    optionText: {
        fontSize: 16,
        color: "#000",
    },
    optionStyle: {
        backgroundColor: "#D9D9D9",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionContainer: {
        backgroundColor: "#D9D9D9",
    },
    cancelStyle: {
        backgroundColor: "#D9D9D9",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    cancelTextStyle: {
        fontSize: 16,
        color: "#000",
        textTransform: "capitalize"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    createButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "black",
        borderRadius: 5,
        alignItems: "center",
    },
    createButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    disabledButton: {
        opacity: 0.75,
    },
});

export default CreateRoomScreen;
