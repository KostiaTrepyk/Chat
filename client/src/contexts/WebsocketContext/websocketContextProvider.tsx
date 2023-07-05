import { PropsWithChildren } from "react";
import {
    socket,
    WebsocketContext,
    WebsocketContextData,
} from "./websocketContext";

export default function WebsocketContextProvider({
    children,
}: PropsWithChildren) {
    const value: WebsocketContextData = {
        socket: socket,
    };

    return (
        <WebsocketContext.Provider value={value}>
            {children}
        </WebsocketContext.Provider>
    );
}
