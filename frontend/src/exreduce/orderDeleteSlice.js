import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: 'deleteOrder',
    initialState: {
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        oDeleteReq: (state, action) => {
            state.loading = true
        },
        oDeleteSuccess: (state, action) => {
            state.loading = false;
            state.success = true
        },
        oDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        oDeleteReset: (state, action) => {
            state.success = false
        }
    }
});

export const {
    oDeleteReq,
    oDeleteSuccess,
    oDeleteFail,
    oDeleteReset
} = slice.actions;
export default slice.reducer;

const url = "/orders";
export const deleteOrder = (orderId) => apiCallOrder({
    url: url + "/" + orderId,
    method: "delete",
    onStart: oDeleteReq.type,
    onSuccess: oDeleteSuccess.type,
    onFail: oDeleteFail.type
});