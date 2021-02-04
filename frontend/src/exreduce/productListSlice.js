import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from './api'


const slice = createSlice({
    name: 'prod',
    initialState: {
        list: [],
        loading: true,
        lastFetch: null,
        error: null
    },
    reducers: {
        productRequested: (state, action) => {
            state.loading = true;
        },

        productReceived: (state, action) => {
            state.loading = false;
            state.list = action.payload;
            state.lastFetch = Date.now();
        },

        productFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {
    productRequested,
    productReceived,
    productFail
} = slice.actions;
export default slice.reducer;


const url = "/products";
export const pList = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.productList;
    
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if (diffInMinutes < 10) return; 

    dispatch(apiCallBegan({
        url,
        onStart: productRequested.type,
        onSuccess: productReceived.type,
        onError: productFail.type
    }));
};

// export const loadBugs = () => apiCallBegan({
//     url,
//     onStart: productRequested.type,
//     onSuccess: productReceived.type,
//     onError: productFail.type
// })





// "nodemon --watch backend --exec node --experimental-modules backend/server.js"