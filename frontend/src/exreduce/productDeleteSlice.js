import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: 'deleteProduct',
    initialState: {
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        pDeleteReq: (state, action) => {
            state.loading = true
        },
        pDeleteSuccess: (state, action) => {
            state.loading = false;
            state.success = true
        },
        pDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        pDeleteReset: (state, action) => {
            return {}
        }
    }
})

export const {
    pDeleteReq,
    pDeleteSuccess,
    pDeleteFail,
    pDeleteReset
} = slice.actions;
export default slice.reducer;


const url = '/products';

export const deleteProduct = (productId) => apiCallOrder({
    url: url + '/' + productId,
    method: 'delete',
    onStart: pDeleteReq.type,
    onSuccess: pDeleteSuccess.type,
    onFail: pDeleteFail.type
});

