import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./apiAction";
import orderApi from "./cardApi";
import reducer from './reducer';

const preloadedState = 
    {entities: {
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'PayPal',
    },
    userSignin: {
      userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    },
  }
};

export default function(){
    return configureStore({
        reducer,
        preloadedState,
        middleware: [
            ...getDefaultMiddleware(),api,orderApi
        ]
    })
};