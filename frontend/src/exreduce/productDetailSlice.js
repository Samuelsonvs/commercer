import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
// import moment from 'moment';

const slice = createSlice({
    name: 'proDetail',
    initialState: {
        product: [],
        loading: true,
        //lastFetch: null,
        error: null
    },
    reducers: {
        productDetailRequested: (state, action) => {
            state.loading = true;
        },

        productDetailReceived: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            // state.lastFetch = Date.now()
        },

        prodcutDetailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {
    productDetailRequested,
    productDetailReceived,
    prodcutDetailFail
} = slice.actions;
export default slice.reducer;


const url = "/products";
// export const detailProduct = (id) => (dispatch, getState) => {
//     const { lastFetch } = getState().entities.productList;
    
//     const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
//     if (diffInMinutes < 10) return;

//     dispatch(apiCallBegan({
//         url: url + '/' + id,
//         onStart: productDetailRequested.type,
//         onSuccess: productDetailReceived.type,
//         onError: prodcutDetailFail.type
//     }));
// };



export const detailProduct = (prodId) => apiCallBegan({
    url: url + '/' + prodId,
    method: 'get',
    onStart: productDetailRequested.type,
    onSuccess: productDetailReceived.type,
    onError: prodcutDetailFail.type
});