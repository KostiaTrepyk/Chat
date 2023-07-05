import { io, Socket } from "socket.io-client";
import { createContext } from "react";

export type WebsocketContextData = {
    socket: Socket;
};

export const socket = io("http://localhost:5000", {
    autoConnect: true,
    transports: ["websocket", "polling"],
    extraHeaders: { Authorization: "Bearer " + localStorage.getItem("token") },
});

const initialData: WebsocketContextData = {
    socket: socket,
};

export const WebsocketContext =
    createContext<WebsocketContextData>(initialData);
