import {delay} from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../Actions/index';

export function* logoutSaga (action) {
    yield call([localStorage, "removeItem"], 'token');
    yield call([localStorage, "removeItem"], 'expirationDate');
    yield call([localStorage, "removeItem"], 'userId');
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga (action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout())
    
};

export function* authUserSaga (action){
    yield put(actions.authStart());
        const autData ={
            email: action.email,
            password: action.password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJsaEqi9-aipokmwddc1CI5MaiL-fkHps'
        if(!action.isSignup){
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJsaEqi9-aipokmwddc1CI5MaiL-fkHps';
        }
        try{
            const response = yield axios.post( url, autData)
            const expirationData = yield new Date(new Date().getTime() + response.data.expiresIn * 1000 );
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationData', expirationData);
            yield localStorage.setItem('userId', response.data.localId)
            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            yield put(actions.checkAuthTimeout(response.data.expiresIn))
        } catch (error) {
            yield put(actions.authFail(error.response.data.error))
        };
};

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
        if(!token){
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationData'));
            if(expirationDate <= new Date()){
                yield put(actions.logout())
            } else {
                const userId = localStorage.getItem('userId')
                yield put(actions.authSuccess(token, userId))
                yield put(
                    actions.checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime())/ 1000
                        )
                    );
            };
        };
};
