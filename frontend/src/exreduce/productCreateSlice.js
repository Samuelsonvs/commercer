import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: 'createProduct',
    initialState: {
        loading: false,
        success: false,
        product: {},
        error: null
    },
    reducers: {
        pCreateReq: (state, action) => {
            state.loading = true
        },
        pCreateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload
        },
        pCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        pCreateReset: (state, action) => {
            state.product = {}
        }
    }
});

export const {
    pCreateReq,
    pCreateSuccess,
    pCreateFail,
    pCreateReset
} = slice.actions;
export default slice.reducer;

const url = "/products";
export const createProduct = () => apiCallOrder({
    url,
    method: "post",
    data: {},
    onStart: pCreateReq.type,
    onCreate: pCreateSuccess.type,
    onFail: pCreateFail.type,
})