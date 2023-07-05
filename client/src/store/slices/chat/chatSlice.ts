import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../../models/IChat";
import { IMessage } from "../../../models/IMessage";

interface ChatState {
    chats: IChat[] | null;
    chatId: number | null;
    messages: IMessage[] | null;
    messagesLoading: boolean;
}

const initialState: ChatState = {
    chats: null,
    chatId: null,
    messages: null,
    messagesLoading: false,
};

const chatSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<IChat[] | null>) => {
            state.chats = action.payload;
        },
        setChatID: (state, action: PayloadAction<number | null>) => {
            state.chatId = action.payload;
        },
        setMessages: (state, action: PayloadAction<IMessage[] | null>) => {
            state.messages = action.payload;
        },
        setMessagesLoading: (state, action: PayloadAction<boolean>) => {
            state.messagesLoading = action.payload;
        },
    },
});

export const chatActions = chatSlice.actions;

const chatReducer = chatSlice.reducer;
export default chatReducer;
