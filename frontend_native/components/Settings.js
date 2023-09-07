import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-native';
import { UserContext } from '../contexts/UserContext';
import Navbar from './Navbar';

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        setUser([]);
    };

    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'black' : 'white',
    };

    const textStyle = {
        color: isDarkMode ? 'white' : 'black',
        fontSize: 20,
    };

    useEffect(() => {
        if (user?.length === 0) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <>
            <View style={[styles.container, backgroundStyle]}>
                <Text style={[textStyle, styles.title]}>Settings</Text>
                <View style={styles.settingRow}>
                    <Text style={textStyle}>Dark Mode: </Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: 'gray', true: 'green' }}
                        thumbColor={isDarkMode ? 'white' : 'gray'}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.iconRow}>
                    <FontAwesomeIcon icon={faSun} size={30} style={styles.icon} />
                    <FontAwesomeIcon icon={faMoon} size={30} style={styles.icon} />
                </View>
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
    },
    title: {
        marginBottom: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
});

export default Settings;
