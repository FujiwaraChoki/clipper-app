import { useState, createContext } from "react";

export const RouteHistoryContext = createContext({});

export default function RouteHistoryProvider({ children }) {
    const [history, setHistory] = useState([]);

    return (
        <RouteHistoryContext.Provider value={[history, setHistory]}>
            {children}
        </RouteHistoryContext.Provider>
    );
}