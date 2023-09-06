import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { UserContext } from '../contexts/UserContext';

import * as Clipboard from 'expo-clipboard';
import ClipboardItem from './ClipboardItem';
import Navbar from './Navbar';

const Home = () => {
    const [history, setHistory] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newHistoryItem, setNewHistoryItem] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const getClipboard = async () => {
        const clipboard = await Clipboard.getStringAsync();
        setNewHistoryItem(clipboard);
    };

    const callHistoryApi = async () => {
        if (!user.uid) return;
        try {
            await fetch(`http://192.168.1.14:3000/history/${user.uid}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('History:', data);
                    setHistory(data);
                });
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const generateId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const addHistoryItem = async (item) => {
        if (item) {
            setHistory([...history, {
                text: item,
                date: new Date().toLocaleString(),
            }]);

            console.log('Adding history item:', {
                text: item,
                date: new Date().toLocaleString(),
            });

            await fetch('http://192.168.1.14:3000/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item: {
                        text: item,
                        date: new Date().toLocaleString(),
                        id: generateId(),
                    },
                    uid: user.uid,
                }),
            });

            setModalVisible(false);
        }
    };

    useEffect(() => {
        if (user?.length === 0) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        console.log("USER: ", user);

        getClipboard();

        if (history.length === 0) {
            callHistoryApi();
        }
    }, []);

    return (
        <>
            <View style={styles.page}>
                <View style={styles.historyContainer}>
                    <Text style={styles.historyHeader}>History</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.buttonText}>Add to Clipboard</Text>
                    </TouchableOpacity>
                    {history.map((item, index) => (
                        <ClipboardItem historyState={{ history, setHistory }} item={item} key={index} />
                    ))}
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Add History Item:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setNewHistoryItem(text)}
                        placeholder="Enter item"
                        value={newHistoryItem}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addHistoryItem(newHistoryItem)}
                    >
                        <Text style={styles.buttonText}>Add Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Navbar />
        </>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 0,
    },
    historyContainer: {
        flex: 1,
        padding: 10,
    },
    historyHeader: {
        fontSize: 26,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    modalHeader: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Home;
