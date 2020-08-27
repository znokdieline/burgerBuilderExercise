import { put } from 'redux-saga/effects';

import axios from '../../Axios-order';
import * as actions from '../Actions/index';

export function* purchaseBurgerSaga(action){
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/order.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerBurgerSuccess(response.data.name, action.orderData))
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error))
    };
};

export function* fetchOrdersSaga(action){
    yield put(actions.fetchOrdersStart());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        try{
            const response = yield axios.get('/order.json' + queryParams);

            const fetchOrders = [];
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                };
            yield put(actions.fetchOrdersSuccess(fetchOrders))
        } catch (error) {
            yield put(actions.fetchOrdersFail(error))
        }
}