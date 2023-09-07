import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useContext } from 'react';

import Navbar from './Navbar';
import { UserContext } from '../contexts/UserContext';

const Contact = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://formspree.io/f/xoqowyvq', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Your message has been sent successfully.');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                Alert.alert('Error', 'There was an error sending your message. Please try again later.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user || user.length === 0) {
            navigate('/login');
        }
    }, [user]);

    return (
        <>
            <View style={styles.page}>
                <Text style={styles.header}>Contact</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    multiline
                    numberOfLines={4}
                    value={formData.message}
                    onChangeText={(text) => handleInputChange('message', text)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
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
    }
});

export default Contact;
