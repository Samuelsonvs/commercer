import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

export default function(){
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
        ]
    })
}

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

// export default store;