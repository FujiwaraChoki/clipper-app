import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import Navbar from './Navbar';

const Settings = () => {
    const [isLightOn, setIsLightOn] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleLight = () => {
        setIsLightOn(!isLightOn);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Apply the user's preferences to the app's theme
    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'black' : isLightOn ? 'white' : 'gray',
    };

    const textStyle = {
        color: isDarkMode ? 'white' : 'black',
        fontSize: 20,
    };

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
        fontSize: 28,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default Settings;
