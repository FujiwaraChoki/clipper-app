import { View } from "react-native";
import { Link } from "react-router-native";

export default function StyledLink({ style, children, to }) {
    return (
        <Link
            to={to}
            underlayColor=""
        >
            <View style={style}>
                {children}
            </View>
        </Link>
    );
}