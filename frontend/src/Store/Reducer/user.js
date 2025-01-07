import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',// name of the slice
    initialState,// initial state of the slice
    reducers: {
        // action creators
        CHANGE_LOGIN(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        UPDATE_USER(state, action) {
            state.user = action.payload;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice; 
    