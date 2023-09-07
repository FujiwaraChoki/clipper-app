import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

const useUser = () => {
    const [user] = useContext(UserContext);

    return user;
};

export default useUser;
