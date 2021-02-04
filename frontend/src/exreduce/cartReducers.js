import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
// import moment from 'moment';

const slice = createSlice({
    name: 'cartReducer',
    initialState: {
        cartItems: [],
        loading: true,
        shippingAddress: null,
        paymentMethod: null,
        //lastFetch: null,
        error: null
    },
    reducers: {
        cartAddItem: (state, action) => {
            const item = action.payload;
            const index = state.cartItems.findIndex((x) => x.product === item.product);
            index > -1 
            ? state.cartItems[index] = item 
            : state.cartItems.push(item)
        },
        cartRemoveItem: (state, action) => {
            state.cartItems = state.cartItems.filter((a) => a.product !== action.payload)
        },
        cartSaveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        cartSavePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
        },
        cartEmpty: (state, action) => {
            state.cartItems = []
        }
    }
})


export const {
    cartAddItem,
    cartRemoveItem,
    cartSaveShippingAddress,
    cartSavePaymentMethod,
    cartEmpty
} = slice.actions;
export default slice.reducer;

const url = "/products";

export const addToCart = (productId, qty) => apiCallBegan({
    url: url + '/' + productId,
    method: 'get',
    data: { qty },
    onCard: cartAddItem.type
});


export const removeCartItem = (productId) => apiCallBegan({
    data: productId,
    onRemove: cartRemoveItem.type,
});

export const saveShippingAddress = (data) => apiCallBegan({
    data,
    onShipping: cartSaveShippingAddress.type
});

export const savePaymentMethod = (data) => apiCallBegan({
    data,
    onPayment: cartSavePaymentMethod.type
})

// export const addToCart = (productId, qty) => (dispatch, getState) => {
//     const { lastFetch } = getState().entities.cart;
    
//     const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
//     if (diffInMinutes < 10) return;

//     dispatch(apiCallBegan({
//         url: url + '/' + productId,
//         method: 'get',
//         data: {qty},
//         onCard: cartAddItem.type
//     }));
//     localStorage.setItem('cartItems', JSON.stringify(getState().entities.cart.cartITems));
// };