import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { UserContext } from '../contexts/UserContext';

import Navbar from './Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.14:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            }

            console.log('Login response:', data);
            setUser(data);
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in');
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
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

                <Button
                    title="Login"
                    onPress={handleLogin}
                    style={styles.loginButton}
                    textStyle={styles.loginButtonText}
                />

                <Text style={{ marginTop: 20 }}>
                    Don't have an account?{' '}
                    <Text
                        style={{ color: '#007AFF' }}
                        onPress={() => navigate('/signup')}
                    >
                        Sign up
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
    loginButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


export default Login;;
