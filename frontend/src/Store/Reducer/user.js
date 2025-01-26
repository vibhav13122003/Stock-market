import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: false, // Fix: Add `login` explicitly to initial state
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('clientToken')) || null,  // Fix: Match with `clientToken` instead of `token`
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        CHANGE_LOGIN(state, action) {
            if (action.payload) {
                state.login = true;
                state.user = action.payload.user || null;
                state.token = action.payload.token || null;
                // Save to localStorage
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('clientToken', JSON.stringify(state.token)); // Fix: Store with 'clientToken'
            } else {
                state.login = false;
                state.user = null;
                state.token = null;
                // Clear localStorage
                localStorage.removeItem('user');
                localStorage.removeItem('clientToken'); // Fix: Remove 'clientToken' instead of 'token'
            }
        },
        UPDATE_USER(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user)); // Keep user data in sync with localStorage
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
