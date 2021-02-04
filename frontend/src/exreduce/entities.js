import { combineReducers } from 'redux';
import pListReducer from './productListSlice';
import pDetailReducer from './productDetailSlice';
import cartReducers from './cartReducers';
import userSigninReducer from './userReducers';
import userRegisterReducer from './userRegisterSlice';
import orderCreateReducer from './orderSlice';
import orderDetailsReducer from './orderDetailSlice';

export default combineReducers({
    productList: pListReducer,
    productDetails: pDetailReducer,
    cart: cartReducers,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
});