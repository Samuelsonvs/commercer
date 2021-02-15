import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: 'productUpdate',
    initialState: {
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        pUpdateReq: (state, action) => {
            state.loading = true
        },
        pUpdateSuccess: (state, action) => {
            state.loading = false;
            state.success = true
        },
        pUpdateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        pUpdateReset: (state, action) => {
            return {}
        }
    } 
});

export const {
    pUpdateReq,
    pUpdateSuccess,
    pUpdateFail,
    pUpdateReset
} = slice.actions;
export default slice.reducer;

const url = '/products';
export const updateProduct = (product) => apiCallOrder({
    url: url + '/' + product._id,
    method: 'put',
    data: product,
    onStart: pUpdateReq.type,
    onSuccess: pUpdateSuccess.type,
    onFail: pUpdateFail.type
})
