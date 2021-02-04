import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: "orderDetail",
    initialState: {
        loading: false,
        order: {},
        error: null
    },
    reducers: {
        odetailReq: (state, action) => {
            state.loading = true
        },
        odetailSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload
        },
        odetailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
});
export const {
    odetailReq,
    odetailSuccess,
    odetailFail
} = slice.actions;

export default slice.reducer;

const url = "/orders";
export const detailsOrder = (orderId) => apiCallOrder({
    url: url + "/" + orderId,
    method: "get",
    onStart: odetailReq.type,
    onSuccess: odetailSuccess.type,
    onError: odetailFail.type
})