import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';


const slice = createSlice({
    name: 'orderHistory',
    initialState: {
        loading: false,
        orders: [],
        error: null,
    },
    reducers: {
        orderHistoryReq: (state, action) => {
            state.loading = true
        },
        orderHistorySuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload
        },
        orderHistoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
});


export const {
    orderHistoryReq,
    orderHistorySuccess,
    orderHistoryFail
} = slice.actions;

export default slice.reducer;

const url = "orders/mine";

export const listOrderMine = () => apiCallOrder({
    url,
    method: "get",
    onStart: orderHistoryReq.type,
    onSuccess: orderHistorySuccess.type,
    onError: orderHistoryFail.type
})