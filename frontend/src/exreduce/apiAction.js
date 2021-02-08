import axios from 'axios';
import * as actions from './api';

const api = ({ dispatch, getState }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) { return next(action)};

    
    const { url, method, data, onShipping, onPayment, onEmpty, onRemove, onReg, onRegSign, onOut, onSign, onStart, onCard, onSuccess, onError } = action.payload;

    if(onRemove) {dispatch({type: onRemove, payload: data});
        localStorage.setItem('cartItems', JSON.stringify(getState().entities.cart.cartItems))};

    if(onOut) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        dispatch({ type: onOut });
    };

    if(onPayment) {
        dispatch({ type: onPayment, payload: data})
    };
    
    if(onShipping) {
        dispatch({ type: onShipping, payload: data });
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    };

    // if(onShipping) {
    //     dispatch({ type: onShipping, payload: data })
    // }

    if(onStart) dispatch({ type: onStart });  

    if (url) {
        next(action); 
        try{
            const response = await axios.request({
                baseURL: process.env.HOST || 'http://localhost:5000/api',
                url,
                method,
                data,
            });

            if(onCard) {
                dispatch({
                type: onCard,
                payload: {
                    name: response.data.name,
                    image: response.data.image,
                    price: response.data.price,
                    countInStock: response.data.countInStock,
                    product: response.data._id,
                    qty: data
                }
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().entities.cart.cartItems));
            };

            if (onSign) {
                dispatch({ type: onSign, payload: response.data });
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            };

            if (onReg) {
                dispatch({ type: onReg, payload: response.data });
                dispatch({ type: onRegSign, payload: response.data });
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            }

            if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

        } catch(error) {
            console.log(error);
            if (onError) {dispatch({ type: onError, payload: error.response.data.message ? error.response.data.message : error.message  })};
        }
    }
}

export default api;