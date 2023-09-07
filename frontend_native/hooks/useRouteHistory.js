import { useContext } from "react";

import { RouteHistoryContext } from "../contexts/RouteHistoryContext";

const useRouteHistory = () => {
    const [history] = useContext(RouteHistoryContext);

    return history;
};

export default useRouteHistory;
