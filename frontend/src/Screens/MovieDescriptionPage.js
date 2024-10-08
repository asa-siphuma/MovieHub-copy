import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity, Modal, Button  } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getMovieCredits,getMovieRuntime } from "../Services/TMDBApiService";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../Components/Cast";
import axios from "axios";
import { Ionicons, Octicons, FontAwesome6, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

export default function MovieDescriptionPage({ userInfo }) { 

    const route = useRoute();
    const { movieId, imageUrl, title, rating, overview, date } = route.params;

    const [colors, setColors] = useState([
        "rgba(0, 0, 0, 0.7)", // Fallback to white if colors not loaded
        "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.7)",
    ]); // Initial state with three colors, can be replaced with initial color values

    const [credits, setCredits] = useState({ cast: [], crew: [] });
    const [loading, setLoading] = useState(true);
    const [isAddedToList, setIsAddedToList] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [runtime, setRuntime] = useState(null);
    const [isReviewed, setIsReviewed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleReviewPress = () => {
        setIsReviewed(true);
        navigation.navigate('CreatePost', { userInfo });
    };

    const handleAddPress = () => {
        setIsModalVisible(true);
    };

    const handleLogBookPress = () => {
        navigation.navigate('LogBookScreen', { title });
    };

    const handleCreateNewWatchlist = () => {
        navigation.navigate('CreateWatchlist', { userInfo });
        setIsModalVisible(false);
    };

    const handleAddToExistingWatchlist = () => {
        navigation.navigate('EditWatchlist', { userInfo });
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchCredits = async () => {
            const data = await getMovieCredits(movieId);
            setCredits(data);
        };
        fetchCredits();
    }, [movieId]);

    useEffect(() => {
        const fetchRuntime = async () => {
            try {
                const minutes = await getMovieRuntime(movieId);
                // Convert minutes to hours and minutes
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                setRuntime({ hours, mins });
            } catch (error) {
                console.error('Error fetching runtime:', error);
            }
        };

        fetchRuntime();
    }, [movieId]);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:3000/extract-colors`,
                    { imageUrl },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Convert RGB arrays to rgba strings
                const convertedColors = response.data.colors.slice(0, 3).map((color) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`);
                setColors(convertedColors);
            } catch (error) {
                console.error("Error fetching colors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchColors();
    }, [imageUrl]);

    const director = credits.crew.find((person) => person.job === "Director");
    const cast = credits.cast.slice(0, 5).map((person) => person.name).join(", ");

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#4A42C0" style={styles.activityIndicator} />
            </SafeAreaView>
        );
    }

    // round of rating to 1 decimal place
    const roundedRating = Math.round(rating * 10) / 10;

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            <LinearGradient colors={colors} style={styles.content}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.wholecontainer}>
                        <View style={styles.card}>
                            <Image source={{ uri: imageUrl }} style={styles.image} />
                        </View>
                    </View>
                    <View style={styles.moviedes}>
                        <View style={styles.movieinfo}>
                            <Text style={styles.movietitle}>{title}</Text>
                            <Text style={styles.movieRating}>{roundedRating}/10</Text>
                        </View>
                        <View style={styles.movieinfo2}>
                            <Text style={styles.movietitle2}>{date} </Text>
                            <Text style={styles.movietitle2}> | </Text>
                            <Text style={styles.movietitle2}>{runtime.hours > 0 ? `${runtime.hours} h ` : ''}{runtime.mins} mins</Text>
                        </View>
                        <View style={styles.icons}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iconsContent}>
                                <TouchableOpacity onPress={handleAddPress} style={styles.block1}>
                                    <View style={styles.iconTextContainer}>
                                        <FontAwesome6 name={isAddedToList ? 'check' : 'add'} size={24} color="white" style={styles.icon} />
                                        <Text style={styles.text}>{isAddedToList ? 'Added' : 'Add to list'}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsWatched(!isWatched)} style={styles.block2}>
                                    <View style={styles.iconTextContainer}>
                                        <FontAwesome name="check-circle" size={24} color={isWatched ? 'green' : 'white'} style={styles.icon} />
                                        <Text style={styles.text}>{isWatched ? 'Watched' : 'Watch'}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.block3} onPress={handleReviewPress}>
                                    <View style={styles.iconTextContainer}>
                                        <Ionicons name="star-outline" size={24} color={isReviewed ? 'gold' : 'white'} style={styles.icon} />
                                        <Text style={styles.text}>{isReviewed ? 'Reviewed' : 'Review'}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.block4}>
                                    <View style={styles.iconTextContainer}>
                                        <SimpleLineIcons name="screen-desktop" size={24} color='white' style={styles.icon} />
                                        <Text style={styles.text}>Watch Party</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.block3} onPress={handleLogBookPress} >
                                    <View style={styles.iconTextContainer}>
                                        <Ionicons name="book-outline" size={24} color="white" style={styles.icon}/>
                                        <Text style={styles.text}>Log Movie</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        
                        <View style={styles.moviebio}>
                            <Text style={styles.moviebiotext}>{overview}</Text>
                        </View>
                        <View>
                            <Text style={styles.moviebio}>
                                <Text style={styles.bold}>Starring:</Text> {cast}
                            </Text>
                            <Text style={styles.moviebio}>
                                <Text style={styles.bold}>Directed by:</Text> {director ? director.name : "N/A"}
                            </Text>
                        </View>
                        <Text style={styles.moviecast}> Cast</Text>
                        <ScrollView horizontal contentContainerStyle={styles.castContainer}>
                            {credits.cast.slice(0, 5).map((member, index) => (
                                <Cast key={index} imageUrl={`https://image.tmdb.org/t/p/w500${member.profile_path}`} name={member.name} />
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </LinearGradient>

            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Button title="Create a new watchlist" onPress={handleCreateNewWatchlist} color="#000" />
                        <Button title="Add to existing watchlist" onPress={handleAddToExistingWatchlist} color="#000" />
                        <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="#f44336" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    content: {
        flex: 1,
        paddingTop: 50,
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wholecontainer: {
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 50,
    },
    iconTextContainer: {
        width: 79,
        alignItems: 'center',
    },
    icons: {
        paddingTop: 30,
        paddingLeft: 8,
        paddingBottom: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    iconsContent: {
        flexDirection: "row",
    },
    icon: {
        paddingLeft: 0,
    },
    text: {
        paddingLeft: 0,
        color: "white",
        fontWeight: "bold",
    },
    card: {
        paddingTop: 20,
        padding: 10,
        height: 430,
        width: "100%",
    },
    image: {
        width: "100%",
        height: "115%",
        objectFit: "contain",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    movieinfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    movieinfo2: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 10,
    },
    movietitle: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "left",
        color: "white",
        width: "70%",
    },
    movieRating: {
        fontSize: 23,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        paddingTop: 7,
    },
    movietitle2: {
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    moviebio: {
        paddingTop: 20,
        paddingLeft: 20,
        color: "white",
    },
    moviebiotext: {
        fontSize: 15,
        paddingRight: 10,
        color: "white",
    },
    castContainer: {
        flexDirection: 'row',
    },
    moviecast: {
        paddingTop: 20,
        fontSize: 25,
        paddingLeft: 15,
        fontWeight: "bold",
        color: "white",
    },
    bold: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
