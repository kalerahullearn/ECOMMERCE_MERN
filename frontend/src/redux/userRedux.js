import { configureStore, createSlice } from "@reduxjs/toolkit";
import { login } from "../services/UserService";
import { showToast } from "../utils/ShowToast";

const userSlice = createSlice({
    name: "user",
    initialState : {},
    reducers: {
        setUser(state, action){
            return action.payload.data
        }
    }
})

export const { setUser } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
});