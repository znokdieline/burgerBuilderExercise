import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../Actions/ActionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import { initIngredientsSaga } from './BurgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './Orders';

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga),
    ])
};

export function* watchBurgerBuilder () {
    yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientsSaga);
};

export function* watchOrders () {
    yield takeEvery( actionTypes.PURCHASE_BURGER, purchaseBurgerSaga );
    yield takeEvery( actionTypes.FETCH_ORDERS, fetchOrdersSaga );
};