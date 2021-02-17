import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: 'orderDeliver',
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        oDeliverReq: (state, action) => {
            state.loading = true
        },
        oDeliverSuccess: (state, action) => {
            state.loading = false;
            state.success = true
        },
        oDeliverFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        oDeliverReset: (state, action) => {
            state.success = false
        }
    }
});

export const {
    oDeliverReq,
    oDeliverSuccess,
    oDeliverFail,
    oDeliverReset
} = slice.actions;
export default slice.reducer;


const url = '/orders';
export const deliverOrder = (orderId) => apiCallOrder({
    url: url + "/" + orderId + "deliver",
    methods: "put",
    onStart: oDeliverReq.type,
    onSuccess: oDeliverSuccess.type,
    onFail: oDeliverFail.type
});
