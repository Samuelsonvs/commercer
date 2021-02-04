import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { userSignSuccess }from './userReducers';

const slice = createSlice({
    name: 'register',
    initialState: {
        userInfo: null,
        loading: false,
        error: null
    },
    reducers: {
        userRegReq: (state, action) => {
            state.loading = true
        },

        userRegSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload
        },

        userRegFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {
    userRegReq,
    userRegSuccess,
    userRegFail
} = slice.actions;
export default slice.reducer;

const url = "/users";
export const registerUser = (name, email, password) => apiCallBegan({
    url: url + "/register",
    method: "post",
    data: {name, email, password},
    onStart: userRegReq.type,
    onReg: userRegSuccess.type,
    onRegSign: userSignSuccess.type,
    onError: userRegFail.type,
})