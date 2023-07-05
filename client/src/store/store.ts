import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { chatAPI } from "../services/ChatService";
import { userAPI } from "../services/UserService";
import userReducer from "./slices/user/userSlice";
import chatReducer from "./slices/chat/chatSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [chatAPI.reducerPath]: chatAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware, chatAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
