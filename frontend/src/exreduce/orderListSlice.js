import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';


const slice = createSlice({
    name: 'orderList',
    initialState: {
        loading: false,
        orders: [],
        error: null
    },
    reducers: {
        orderListReq: (state, action) => {
            state.loading = true
        },
        orderListSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload
        },
        orderListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
});

export const {
    orderListReq,
    orderListSuccess,
    orderListFail
} = slice.actions;
export default slice.reducer;

const url = "/orders";
export const listOrders = () => apiCallOrder({
    url,
    method: 'get',
    onStart: orderListReq.type,
    onSuccess: orderListSuccess.type,
    onFail: orderListFail.type
});