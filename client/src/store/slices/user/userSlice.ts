import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";

interface UserState {
    user: IUser;
    isAuth: boolean;
}

const initialState: UserState = {
    user: {
        id: null,
        username: null,
        email: null,
        role: null,
        ban: false,
        ban_reason: null,
    },
    isAuth: false,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            state.user = {
                id: null,
                username: null,
                email: null,
                role: null,
                ban: false,
                ban_reason: null,
            };
            state.isAuth = false;
        },
    },
});

const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
export default userReducer;
