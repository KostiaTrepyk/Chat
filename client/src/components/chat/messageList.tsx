import { useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/hooks";

import MessageListItem from "./messageListItem";

import "./styles/messageList.sass";

export default function MessageList() {
    const messages = useAppSelector((state) => state.chat.messages);
    const chatId = useAppSelector((state) => state.chat.chatId);
    const MessageListRef = useRef<HTMLDivElement>(null);

    // scrolls to the last message
    useEffect(() => {
        if (MessageListRef.current) {
            const scrollHeight = Math.max(
                MessageListRef.current.scrollHeight,
                MessageListRef.current.offsetHeight,
                MessageListRef.current.clientHeight
            );
            MessageListRef.current.scrollTo({
                top: scrollHeight,
                left: 0 /* behavior: "smooth" */,
            });
        }
    }, [messages]);

    return (
        <div className="MessageList" ref={MessageListRef}>
            {chatId ? (
                messages?.length === 0 ? (
                    <div className="MessageList_info">Wright message first</div>
                ) : (
                    messages?.map((message) => (
                        <MessageListItem
                            key={message.id}
                            messageFrom={message.user}
                            messageText={message.text}
                            messageTime={message.time}
                        />
                    ))
                )
            ) : (
                <div className="MessageList_info">{"<"}- Select chat</div>
            )}
        </div>
    );
}
