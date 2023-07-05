import jwtDecode from "jwt-decode";
import { memo, useContext } from "react";
import { WebsocketContext } from "../../contexts/WebsocketContext/websocketContext";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { chatActions } from "../../store/slices/chat/chatSlice";

import "./styles/chatListItem.sass";

type ChatItemProps = {
    chatId: number;
    chatTitle: string;
};

export default memo(function ChatListItem(props: ChatItemProps) {
    const chatId = useAppSelector((state) => state.chat.chatId);
    const dispatch = useAppDispatch();

    const token = localStorage.getItem("token");
    const tokenData = jwtDecode(JSON.parse(token || "''"));
    const websocketContext = useContext(WebsocketContext);

    async function itemHandler(): Promise<void> {
        if (chatId !== props.chatId) {
            dispatch(chatActions.setChatID(props.chatId));
            websocketContext.socket.emit(
                "requestMessages",
                { chatId: props.chatId, tokenData },
                (res: any): void => {
                    // type error
                    dispatch(chatActions.setMessages(res));
                }
            );
        }
    }

    return (
        <div
            className={`ChatItem ${
                chatId === props.chatId && "ChatItem_active"
            }`}
            onClick={itemHandler}
        >
            <div>{props.chatTitle}</div>
        </div>
    );
});
