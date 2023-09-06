import { View, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage, faGear, faAddressCard, faHome } from "@fortawesome/free-solid-svg-icons";

import StyledText from "./StyledText";

const Navbar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <View style={styles.navbarTop}>
                    <StyledText style={styles.title}>Clipper</StyledText>
                    <View style={styles.iconContainer}>
                        <Link to="/">
                            <FontAwesomeIcon size={26} icon={faHome} />
                        </Link>
                        <Link to="/about">
                            <FontAwesomeIcon size={26} icon={faAddressCard} />
                        </Link>
                        <Link to="/contact">
                            <FontAwesomeIcon size={26} icon={faMessage} />
                        </Link>
                        <Link to="/settings">
                            <FontAwesomeIcon size={26} icon={faGear} />
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
    },
    navbar: {
        padding: 30,
        paddingBottom: 50,
    },
    navbarTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
        gap: 20,
    },
    navbarBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "500",
    },
});

export default Navbar;
