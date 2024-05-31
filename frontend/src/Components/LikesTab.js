import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Post from "./Post";

export default function LikesTab() {
    const posts = [
        {
            userAvatar: "https://i.pravatar.cc/500",
            postTitle: "Is Ms. Marvel worth the watch?",
            image: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/9681C7C3404BEDE1305C98BD6A300BAB911BF870EF239C1817C11E88A6357467/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp",
            preview: "When I first saw the trailer for the movie I wasn't hyped up tbh. It's been getting a bit of a popu...",
            likes: 100,
            comments: 23,
            saves: 7,
            date: "03-02-2022 11:00:00",
        },
        {
            userAvatar: "https://i.pravatar.cc/600",
            postTitle: "Cliche doesn't always mean bad",
            preview: "Let's be honest",
            likes: 407,
            comments: 44,
            saves: 42,
        },
        {
            postTitle: "Interstellar is peak fiction",
            image: "https://sm.mashable.com/mashable_in/seo/3/38983/38983_u23h.jpg",
            preview: "If you have ever watched the movie, you know that it is an amazing piece of cinematic art. It's so...",
            likes: 703,
            comments: 207,
            saves: 60,
        },
    ];

    return (
        <PostsTab 
            username="Rick Sanchez" 
            userHandle="@rickestrick" 
            postTitle
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    userHandle: {
        color: "#666",
        marginTop: 5,
    },
});
