import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'userSigninReducer',
    initialState: {
        userInfo: null,
        loading: true,
        lastFetch: null,
        error: null
    },
    reducers: {
        userSignReq: (state, action) => {
            state.loading = true
        },

        userSignSuccess: (state, action) => {
            state.loading = false;
            state.userInfo =  action.payload
        },

        userSignFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        userSignOut: (state, action) => {
            state.userInfo = null;
        }
    }
});

export const {
    userSignReq,
    userSignSuccess,
    userSignFail,
    userSignOut
} = slice.actions;
export default slice.reducer;

const url = "/users";

export const signUser = (email, password) => apiCallBegan({
    url: url + "/signin",
    method: "post",
    data: {email, password},
    onStart: userSignReq.type,
    onSign: userSignSuccess.type,
    onError: userSignFail.type
});

export const outUser = () => apiCallBegan({
    onOut: userSignOut.type
})
