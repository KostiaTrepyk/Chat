import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../contexts/WebsocketContext/websocketContext";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IMessage } from "../../models/IMessage";
import { chatActions } from "../../store/slices/chat/chatSlice";
import jwtDecode from "jwt-decode";

import useToggle  from "../../hooks/useToggle";
import MessageList from "./messageList";
import ModalAddUser from "./modals/ModalAddUser";

import "./styles/chat.sass";

export default function ChatShow() {
    const [ModalAdduserOpened, ModalAdduserOpenedToggle] = useToggle(false);
    const [text, setText] = useState<string>("");

    const chatId = useAppSelector((state) => state.chat.chatId);
    const messages = useAppSelector((state) => state.chat.messages);
    const dispatch = useAppDispatch();

    const websocketContext = useContext(WebsocketContext);

    useEffect(() => {
        websocketContext.socket.on("message", (res: IMessage) => {
            if (messages) {
                dispatch(chatActions.setMessages([...messages, res]));
            } else {
                dispatch(chatActions.setMessages([res]));
            }
        });
        return () => {
            websocketContext.socket.off("message");
        };
    }, [messages, dispatch, websocketContext.socket]);

    async function sendMessageHandler(e: any): Promise<void> {
        e.preventDefault();
        if (!chatId) {
            alert("Select chat!");
            return;
        }

        const token = localStorage.getItem("token");
        const tokenData = jwtDecode(token || "");

        const data: {
            chatId: number;
            text: string;
            tokenData: any;
        } = { chatId, text, tokenData };
        websocketContext.socket.emit("sendMessage", data, (res: any) => {
            /*  */
        });
        setText("");
    }

    return (
        <div className="Chat">
            <div className="Chat_controlls">
                <button
                    onClick={() => {
                        ModalAdduserOpenedToggle();
                    }}
                >
                    Add user to the chat
                </button>
            </div>
            <MessageList />
            <form className="Chat_form">
                <input
                    type="text"
                    placeholder="..."
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
                <button type="submit" onClick={sendMessageHandler}>
                    Send
                </button>
            </form>
            <ModalAddUser
                active={ModalAdduserOpened}
                toggle={ModalAdduserOpenedToggle}
            />
        </div>
    );
}
