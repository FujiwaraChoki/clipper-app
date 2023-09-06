import { View, Text, StyleSheet } from "react-native";

import Navbar from "./Navbar";

const Contact = () => (
    <>
        <View style={styles.page}>
            <Text style={styles.header}>Contact</Text>
        </View>
        <Navbar />
    </>
);


const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
    },
});

export default Contact;