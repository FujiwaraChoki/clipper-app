import { StyleSheet, Text } from "react-native";

export default function StyledText({ children, style }) {
    const styles = StyleSheet.create({
        color: "black",
        ...style
    });

    return (
        <Text style={styles}>{children}</Text>
    );
}