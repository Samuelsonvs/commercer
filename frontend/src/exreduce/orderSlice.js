import { createSlice } from '@reduxjs/toolkit';
import { cartEmpty } from './cartReducers';
import { apiCallOrder } from './api';
import { odetailSuccess } from './orderDetailSlice';

const slice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        success: false,
        order: null,
        error: null
    },
    reducers: {
        orderReq: (state, action) => {
            state.loading = true
        },
        orderSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload
        },
        orderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        orderReset: (state, action) => {
            state.success = false;
            state.order = null
        }
    },
})

export const {
    orderReq,
    orderSuccess,
    orderFail,
    orderReset
} = slice.actions;
export default slice.reducer;

const url = "/orders";
export const createOrder = (order) => apiCallOrder({
    url,
    data: order,
    method: "post",
    onStart: orderReq.type,
    onSuccess: orderSuccess.type,
    onDetailSlice: odetailSuccess.type,
    onError: orderFail.type,
    onEmpty: cartEmpty.type,
})