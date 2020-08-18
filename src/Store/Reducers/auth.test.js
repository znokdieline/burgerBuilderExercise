//no necesita enzyme
import reducer from './auth';
import * as actionTypes from '../Actions/ActionTypes';

describe('auth reducer', () => {
    it('should return initialState', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('should store token', () => {
       expect(reducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'proof-Token',
        userId: 'user_Id_Proof'
    })).toEqual({
        token: 'proof-Token',
        userId: 'user_Id_Proof',
        error: null,
        loading: false,
        authRedirectPath: '/'
    }); 
    });
    it('should show the error', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_FAIL,
            error: 'this is an error'
        })).toEqual({
            token: null,
            userId: null,
            error: 'this is an error',
            loading: false,
            authRedirectPath: '/'
        });
    });
    
});