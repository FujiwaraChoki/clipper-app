import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import * as Clipboard from 'expo-clipboard';

const ClipboardItem = ({ item, historyState }) => {
    const { text, date } = item;
    const [state, setState] = useState('Delete');
    const [user, setUser] = useContext(UserContext);
    const { history, setHistory } = historyState;

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(text);
    };

    return (
        <View style={styles.clipboardItem}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.content}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <View style={styles.copyButtonContainer}>
                    <Button
                        title="Copy"
                        onPress={() => {
                            copyToClipboard();
                            Alert.alert("Success!", "Copied to clipboard.");
                        }}
                        style={styles.copyButton}
                        textStyle={styles.copyButtonText}
                    />
                    <Button
                        title={state}
                        onPress={async () => {
                            setState('Deleting...');

                            const response = await fetch(`http://192.168.1.14:3000/history/${user.uid}/${item.id}`, {
                                method: 'DELETE',
                            }).then((res) => res.json()).catch((err) => console.log(err));

                            console.log('Response:', response);

                            Alert.alert("Success!", "Deleted.");
                            setState('Deleted');

                            const newHistory = history.filter((historyItem) => historyItem.id !== item.id);
                            setHistory(newHistory);
                        }}
                        style={styles.deleteButton}
                        textStyle={styles.deleteButtonText}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    clipboardItem: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        minWidth: "100.1%",
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    date: {
        fontSize: 15,
        color: "#666",
    },
    copyButtonContainer: {
        marginLeft: 10,
    },
    copyButton: {
        backgroundColor: "#007AFF",
        padding: 8,
        borderRadius: 6,
        textAlign: "center",
    },
    copyButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
        padding: 8,
        borderRadius: 6,
        textAlign: "center",
        marginTop: 10,
    },
    deleteButtonText: {
        color: "#FF0000",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default ClipboardItem;;
