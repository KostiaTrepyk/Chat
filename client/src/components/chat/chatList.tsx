import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IChat } from "../../models/IChat";
import { chatAPI } from "../../services/ChatService";
import { chatActions } from "../../store/slices/chat/chatSlice";
import useToggle from "../../hooks/useToggle";

import LoadingWindow from "../modals/loadingWindow";
import ChatListItem from "./chatListItem";
import ModalAddChat from "./modals/ModalAddChat";

import "./styles/chatList.sass";

type ChatListProps = {
    mobileToggleList: () => void;
};

export default memo(function ChatList(props: ChatListProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [ModalAddchatActive, ModalAddchatToggle] = useToggle(false);
    const chats = useAppSelector((state) => state.chat.chats);
    const dispatch = useAppDispatch();

    const filteredChats = useMemo(() => {
        if (chats) {
            return chats.filter((chat) =>
                chat.title
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
            );
        } else {
            return [];
        }
    }, [searchQuery, chats]);

    // Requests
    const [getChatsQueryFnc, getChatsQuery] = chatAPI.useLazyGetChatsQuery({
        refetchOnReconnect: true,
        refetchOnFocus: true,
    });

    useEffect(() => {
        getChatsQueryFnc(null);
    }, [getChatsQueryFnc]);

    // getChatsQuery handler
    useEffect(() => {
        dispatch(chatActions.setChats(getChatsQuery.data));
    }, [getChatsQuery.data, dispatch]);

    async function RefreshChats(): Promise<void> {
        await getChatsQueryFnc(null);
    }

    function stopPropagation(e: React.MouseEvent): void {
        e.stopPropagation();
    }

    function ModalAddchatToggleHandler() {
        ModalAddchatToggle();
    }

    return (
        <>
            <div className="ChatsList">
                <div className="ChatList_controls" onClick={stopPropagation}>
                    <div
                        className="ChatList_RefreshChatsBtn"
                        onClick={RefreshChats}
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM12 18.01C8.83 18.01 6.25 15.43 6.25 12.26C6.25 9.09 8.83 6.51 12 6.51C12.14 6.51 12.29 6.53 12.43 6.54L12.15 6.22C11.88 5.91 11.91 5.43 12.22 5.16C12.53 4.89 13.01 4.92 13.28 5.23L14.95 7.14C14.96 7.15 14.96 7.16 14.97 7.17C14.98 7.18 14.99 7.18 14.99 7.19C15.01 7.22 15.02 7.26 15.04 7.3C15.06 7.35 15.09 7.39 15.1 7.44C15.11 7.49 15.11 7.53 15.12 7.58C15.12 7.63 15.13 7.67 15.13 7.72C15.13 7.77 15.11 7.81 15.09 7.86C15.07 7.91 15.06 7.96 15.04 8C15.02 8.04 14.98 8.08 14.95 8.12C14.92 8.15 14.91 8.19 14.88 8.21C14.87 8.22 14.86 8.22 14.85 8.23C14.84 8.24 14.84 8.25 14.83 8.25L12.89 9.67C12.76 9.77 12.6 9.81 12.45 9.81C12.22 9.81 11.99 9.7 11.84 9.5C11.6 9.17 11.67 8.7 12 8.45L12.56 8.04C12.37 8.03 12.19 8.01 12 8.01C9.66 8.01 7.75 9.92 7.75 12.26C7.75 14.6 9.66 16.51 12 16.51C14.34 16.51 16.25 14.6 16.25 12.26C16.25 11.41 16 10.6 15.54 9.9C15.31 9.56 15.4 9.09 15.75 8.86C16.09 8.63 16.56 8.72 16.79 9.07C17.42 10.02 17.76 11.12 17.76 12.26C17.75 15.44 15.17 18.01 12 18.01Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                    <input
                        className="ChatList_searchInput"
                        type="text"
                        value={searchQuery}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <div
                        className="ChatList_AddChatBtn"
                        onClick={ModalAddchatToggleHandler}
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 12H12M12 12H9M12 12V9M12 12V15M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div className="ChatList_divider"></div>
                <div className="ChatList_list">
                    {getChatsQuery.isLoading ? (
                        <LoadingWindow />
                    ) : (
                        filteredChats.map((item: IChat) => {
                            return (
                                <div
                                    key={item.id}
                                    onClick={props.mobileToggleList}
                                >
                                    <ChatListItem
                                        chatId={item.id}
                                        chatTitle={item.title}
                                    ></ChatListItem>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <ModalAddChat
                active={ModalAddchatActive}
                setActive={ModalAddchatToggle}
            />
        </>
    );
});
