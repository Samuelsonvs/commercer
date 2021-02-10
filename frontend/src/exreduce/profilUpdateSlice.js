import { createSlice } from '@reduxjs/toolkit';
import { apiCallOrder } from './api';
import { userSignSuccess } from './userReducers';

const slice = createSlice({
    name: "updateProfil",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        updateReq: (state, action) => {
            state.loading = true
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        updateFail: (state, action) => {
            state.error = action.payload
        },
        updateReset: (state, action) => {
            return {}
        }
    }
})

const {
    updateReq,
    updateSuccess,
    updateFail,
    updateReset
} = slice.actions;
export default slice.reducer;


const url = "/users/profile";
export const updateUserProfile = (user) => apiCallOrder({
    url,
    method :"put",
    data: user,
    onStart: updateReq.type,
    onSuccess: updateSuccess.type,
    onSign: userSignSuccess.type,
    onFail: updateFail.type
});

export const resetUpdate = () => apiCallOrder({
    onReset:updateReset.type
})
