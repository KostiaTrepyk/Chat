import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getToken(): any {
    return JSON.parse(localStorage.getItem("token") || '""');
}

export const chatAPI = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/chats" }),
    tagTypes: ["Chats", "Messages"],
    endpoints: (build) => ({
        getChats: build.query({
            query: () => ({
                url: "/getChats",
                headers: {
                    Authorization: "Bearer " + getToken(),
                },
            }),
            providesTags: ["Chats"],
        }),
        addChat: build.mutation({
            query: (title: string) => ({
                url: "/addChat",
                method: "post",
                headers: {
                    Authorization: "Bearer " + getToken(),
                },
                body: { title },
            }),
            invalidatesTags: ["Chats"],
        }),
        addUserToChat: build.mutation({
            query: (body: { chatId: number; newUser_Email: string }) => ({
                url: "/addUserToChat",
                method: "post",
                headers: {
                    Authorization: "Bearer " + getToken(),
                },
                body: {
                    chatId: body.chatId,
                    newUser_Email: body.newUser_Email,
                },
            }),
            invalidatesTags: ["Chats"],
        }),
    }),
});
