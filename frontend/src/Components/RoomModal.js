// RoomModal.js
import React, { useCallback, useMemo, forwardRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";

const RoomModal = forwardRef((props, ref) => {
    // const ref = useRef(null);
    const snapPoints = useMemo(() => ["30%"], []);
    const renderBackdrop = useCallback((props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);

    const handleCopyLinkPress = () => {
        console.log("Copy link");
    };
    const handleShare = async () => {
        try {
            const result = await Share.share({
                url: '',
                title: 'MovieHub',
                message: "Watch Party Invite | Join my watch party at ...[link]",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const handleDeleteRoom = () => {
        console.log("Delete Room");
    };

    const renderContent = () => (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                    <Ionicons name="share-social" size={22} color="black" style={styles.icon} />
                    <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleCopyLinkPress}>
                    <Ionicons name="link" size={22} color="black" style={styles.icon} />
                    <Text>Copy link</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleDeleteRoom}>
                    <Icon name="movie" size={22} color="black" style={styles.icon} />
                    <Text>Start Watch Party</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleDeleteRoom}>
                    <Ionicons name="trash" size={22} color="red" style={styles.icon} />
                    <Text style={{ color: "red" }}>Delete Room</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal 
                ref={ref} 
                index={0}
                snapPoints={snapPoints} 
                enablePanDownToClose={true} 
                handleIndicatorStyle={{ backgroundColor: "#4A42C0" }} 
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    {renderContent()}
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
        height: "100%",
        zIndex: 12
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        position: "fixed",
    },
    iconsContainer: {
        flexDirection: "col",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    iconButton: {
        flexDirection: "row", 
        alignItems: "center",
        marginBottom: 16,
        padding: 6
    },
    icon: {
        marginRight: 8
    }

});

export default RoomModal;
