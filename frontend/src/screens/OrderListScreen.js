import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { deleteOrder, oDeleteReset } from '../exreduce/orderDeleteSlice';
import { listOrders } from '../exreduce/orderListSlice';

export default function OrderListScreen(props) {
    const orderList = useSelector((state) => state.entities.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector((state) => state.entities.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: oDeleteReset.type});
        dispatch(listOrders())
    }, [dispatch, successDelete]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : 'No'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => {
                                            props.history.push(`/order/${order._id}`);
                                        }}
                                        >
                                            Details
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(order)}
                                        >
                                            Delete
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}      
        </div>
    );
}
