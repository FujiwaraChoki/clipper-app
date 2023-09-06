import { View, Text, StyleSheet } from "react-native";
import { UserContext } from '../contexts/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-native';

import Navbar from './Navbar';

const About = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        if (user?.length === 0) {
            navigate('/login');
        }
    });

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.description}>
                    Clipper is an App that allows you to view your clipboard history, shared across
                    all your devices. It is built with React Native, Expo, and Node.js.

                    This app was created by:
                    <Text style={{ fontWeight: 'bold' }}> Sami Hindi</Text>
                </Text>
            </View>
            <Navbar />
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default About;