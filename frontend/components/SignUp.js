import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import Navbar from './Navbar';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://192.168.1.14:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            }).then((res) => res.json()).catch((err) => console.log(err));

            if (data.error) {
                setError(data.error);
            }

            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Error signing up');
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Sign Up</Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <View style={styles.inputContainer}>
                    <Text>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Confirm Password:</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry
                    />
                </View>
                <Button title="Sign Up" onPress={handleSignUp} style={styles.signUpButton} textStyle={styles.signUpButtonText} />

                <Text style={{ marginTop: 20 }}>
                    Already have an account?{' '}
                    <Text
                        style={{ color: '#007AFF' }}
                        onPress={() => navigate('/login')}
                    >
                        Login
                    </Text>
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
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
        width: '80%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderRadius: 5,
    },
    signUpButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    signUpButtonText: {
        color: 'white',
    },
});

export default SignUp;
