import { View, Text, StyleSheet } from "react-native";
import Navbar from "./Navbar";

const About = () => (
    <>
        <View style={styles.page}>
            <Text style={styles.header}>About</Text>
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

export default About;