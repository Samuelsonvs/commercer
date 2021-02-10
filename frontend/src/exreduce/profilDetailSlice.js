import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';

const slice = createSlice({
    name: "profilDetailer",
    initialState: {
        loading: false,
        user: {},
        error: null
    },
    reducers: {
        uDetailRequest: (state, action) => {
            state.loading = true
        },
        uDetailSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload
        },
        uDetailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

const {
    uDetailRequest,
    uDetailSuccess,
    uDetailFail
} = slice.actions;
export default slice.reducer;

const url = "/users"
export const detailsUser = (userId) => apiCallOrder({
    url: url + '/' + userId,
    method: "get",
    onStart: uDetailRequest.type,
    onSuccess: uDetailSuccess.type,
    onFail: uDetailFail.type
})