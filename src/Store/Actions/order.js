import * as actionTypes from './ActionTypes';
import axios from '../../Axios-order'

export const purchaseBurgerBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData      
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    };
};

export const purchaseBurger = ( orderData ) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json', orderData)
        .then(response => {
            console.log(response.data)
            dispatch(purchaseBurgerBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/order.json')
            .then( res => {
                console.log(res.data);
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(fetchOrders) 
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            });
    }
};