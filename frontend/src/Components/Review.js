import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Share, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../styles/ThemeContext";
import { useNavigation } from "@react-navigation/native";

import { removeReview } from "../Services/PostsApiServices";
import { toggleLikeReview } from "../Services/LikesApiService";
import { colors } from "../styles/theme";

export default function Review({ reviewId, uid, username, userHandle, userAvatar, likes, comments, image, saves, reviewTitle, preview, dateReviewed, isUserReview, handleCommentPress, movieName, rating, onDelete }) {
    const { theme } = useTheme();
    const [liked, setLiked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const toggleLike = async () => {
        const body = {
            reviewId: reviewId,
            userId: uid,
        };

        try {
            await toggleLikeReview(body);
            console.log("Toggle like successful");
        } catch (error) {
            console.error("Error toggling like:", error);
        }

        setLiked(!liked);
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                url: "",
                title: "MovieHub",
                message: "Check this movie review out on MovieHub: " + reviewTitle,
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
    // Function to remove reviews

    const handleRemoveReview = async (uid, reviewId) => {
        onDelete(reviewId);
        toggleModal();
    };

    // TODO: Increment or decrement number of likes

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor,
            paddingHorizontal: 25,
            paddingVertical: 15,
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.45,
            // shadowRadius: 3.84,
            // elevation: 5,
            borderBottomWidth: 0.8,
            borderTopWidth: 0.5,
            borderBottomColor: theme.borderColor,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
        },
        username: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.textColor,
        },
        userHandle: {
            color: theme.gray,
        },
        reviewButton: {
            backgroundColor: colors.primary,
            padding: 8,
            borderRadius: 55,
            marginTop: 10,
            width: 90,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        reviewButtonText: {
            color: "white",
            fontWeight: "bold",
            // fontSize: 16,
        },
        profileInfo: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
        },
        reviewImage: {
            width: "100%",
            height: 300,
            marginTop: 10,
            borderRadius: 10,
            objectFit: "cover",
        },
        reviewTitle: {
            fontWeight: "600",
            fontSize: 18,
            marginTop: 10,
            color: theme.textColor,
        },
        reviewPreview: {
            color: theme.gray,
            marginVertical: 10,
            marginTop: 5,
        },
        icon: {
            marginRight: 5,
        },
        statsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        stats: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
        },
        statsNumber: {
            color: theme.textColor,
        },
        commentInput: {
            marginTop: 10,
            marginBottom: 10,
            color: theme.gray,
            fontSize: 13,
        },
        modalContainer: {
            position: "absolute",
            top: 50,
            right: 30,
            backgroundColor: "white",
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.45,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 10,
            zIndex: 1000,
        },
        modalOption: {
            paddingVertical: 8,
            paddingHorizontal: 20,
        },
        modalText: {
            color: "black",
            fontSize: 16,
        },
        star: {
            // shadowOpacity: 2,
            // textShadowRadius: 6,
            // textShadowOffset: { width: 1, height: 1 },
            marginRight: 5,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
                <View style={{ alignItems: "left" }}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.userHandle}>
                        {userHandle} &bull; {dateReviewed}
                    </Text>
                </View>
                <Pressable onPress={toggleModal} style={{ marginLeft: "auto" }}>
                    <Icon name="more-vert" size={20} />
                </Pressable>
            </View>
            <View style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>Review</Text>
            </View>

            {image ? <Image source={{ uri: image }} style={styles.reviewImage} /> : null}

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, color: theme.textColor }}>{movieName}</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
                    <Text style={styles.star}>
                        <Icon name="star" size={22} color={"gold"} />
                    </Text>
                    <Text>{rating}</Text>
                </View>
            </View>

            <Text style={styles.reviewTitle}>{reviewTitle}</Text>
            <Text style={styles.reviewPreview}>{preview}</Text>
            <View style={styles.statsContainer}>
                <TouchableOpacity style={styles.stats} onPress={toggleLike}>
                    <Icon name={liked ? "favorite" : "favorite-border"} size={20} color={liked ? "red" : "black"} style={{ marginRight: 5 }} />
                    <Text style={styles.statsNumber}>{likes}</Text>
                </TouchableOpacity>
                <View style={styles.stats}>
                    <Pressable
                        onPress={() => {
                            handleCommentPress(reviewId, true);
                        }}>
                        <CommIcon name="comment-outline" size={20} style={styles.icon} />
                    </Pressable>
                    <Text style={styles.statsNumber}>{comments}</Text>
                </View>
                <View style={styles.stats}>
                    <Icon name="bookmark-border" size={20} style={styles.icon} />
                    <Text style={styles.statsNumber}>{saves}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <Pressable onPress={handleShare}>
                    <CommIcon name="share-outline" size={20} style={styles.icon} />
                </Pressable>
            </View>
            {modalVisible && (
                <View style={styles.modalContainer}>
                    {isUserReview ? ( // Check if the review belongs to the user
                        <>
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => {
                                    navigation.navigate("EditReview", { username, uid, titleParam: reviewTitle, thoughtsParam: preview, imageUriParam: image, reviewId, ratingParam: rating, movieName });
                                }}>
                                <Text style={styles.modalText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => {
                                    handleRemoveReview(uid, reviewId);
                                }}>
                                <Text style={styles.modalText}>Delete</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.modalOption}
                            onPress={() => {
                                /* Report logic */
                            }}>
                            <Text style={styles.modalText}>Report</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}
