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
            <View style={styles.page}>
                <Text style={styles.header}>About</Text>
            </View>
            <Navbar />
        </>
    );
};


const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginBottom: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default About;