import { useState, useContext, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import Navbar from './Navbar';
import { UserContext } from '../contexts/UserContext';

const Settings = () => {
    const [isLightOn, setIsLightOn] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const toggleLight = () => {
        setIsLightOn(!isLightOn);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        setUser([]);
    };

    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'black' : isLightOn ? 'white' : 'gray',
    };

    const textStyle = {
        color: isDarkMode ? 'white' : 'black',
        fontSize: 20,
    };

    useEffect(() => {
        if (user?.length === 0) {
            navigate('/login');
        }
    });

    return (
        <>
            <View style={[styles.container, backgroundStyle]}>
                <Text style={[textStyle, styles.title]}>Settings</Text>
                <View style={styles.settingRow}>
                    <Text style={textStyle}>Light: </Text>
                    <Switch
                        value={isLightOn}
                        onValueChange={toggleLight}
                        trackColor={{ false: 'gray', true: 'green' }}
                        thumbColor={isLightOn ? 'white' : 'gray'}
                    />
                </View>
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
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Settings;
