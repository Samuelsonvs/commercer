import axios from "axios";
import { apiCallOrder } from "./api";

const orderApi = ({dispatch, getState}) => next => async action => {
    if (action.type !== apiCallOrder.type) { return next(action)};

    const {url, method, data, onStart, onEmpty, onSuccess, onDetailSlice, onError} = action.payload;


    if (onStart) {
        dispatch({ type: onStart })
    };


    if (url) {
        next(action);
        try {
            const {
                entities:{ userSignin: userInfo }
            } = getState();
            const response = await axios.request({
                baseURL: 'http://localhost:5000/api',
                url,
                method,
                data,
                headers: {
                    Authorization: `Bearer ${userInfo.userInfo.token}`,
                }
            });
            if (onDetailSlice) dispatch({type: onDetailSlice, payload: response.data.order});
            dispatch({ type: onSuccess, payload: response.data});
            if ( onEmpty) {
                dispatch({ type: onEmpty });
                localStorage.removeItem('cartItems');
            }
            
            

        } catch (error) {
            // console.log("sa")
            dispatch({ type: onError, payload: error.response.data.message ? error.response.data.message : error.message })
        }
    }
};

export default orderApi;