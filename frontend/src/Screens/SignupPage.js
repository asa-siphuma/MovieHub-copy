import React, { useState } from 'react';
import { StyleSheet, Button, Text, TextInput, View, Image, TouchableOpacity} from 'react-native';
import google from '../../../assets/google.png';
import facebook from '../../../assets/facebook.png';
import twitter from '../../../assets/twitter.png';
import { useNavigation } from '@react-navigation/native';
import LoginPage from './LoginPage';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    const handlealreadyuser = () => {
        navigation.navigate("LoginPage");
    };

    const HandleSignup = () => {
        navigation.navigate("HomePage");
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setUsername}
                    value=''
                    placeholder='Userrname'
                />
            </View>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setEmail}
                    value=''
                    placeholder='Email'
                />
            </View>
            <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setPassword}
                    value=''
                    placeholder='Password'
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setConfirmPassword}
                    value=''
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title='Sign Up'
                    color='#000000'
                    paddingHorizontal='50'
                    onPress={HandleSignup}
                />
            </View>
            <View style={styles.or}>
                <View style={styles.line}/>
                <Text style={{fontSize:17}}>Or</Text>
                <View style={styles.line}/>
            </View>
            <View style={styles.socialContainer}>
                <Image style={styles.socialLink} source={google}/>
                <Image style={styles.socialLink} source={facebook}/>
                <Image style={styles.socialLink} source={twitter}/>
            </View>
            <View style={styles.signupLink}>
                <Text style={{fontSize:17}}>Already have an account? </Text>
                <TouchableOpacity onPress={handlealreadyuser} >
                <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: '#000000',
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputText: {
        height: 40,
        width: 250,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 5,
    },  
    socialContainer: {
        flexDirection: 'row',
    },
    socialLink: {
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ffffff',
        paddingVertical: 70,
    },
    signupLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    link: {
        fontSize:17,
        textDecorationLine: 'underline'
    },
    or: {
        flexDirection: 'row',
    },
    line: {
        marginHorizontal: 15,
        height: 1,
        width: '25%',
        backgroundColor: '#000',
        marginVertical: 20
    },
    label: {
        fontWeight: 'bold',
        paddingBottom:2
    },
    btn: {
        width: 250,
        marginTop: 10
    }
});

export default SignupPage;