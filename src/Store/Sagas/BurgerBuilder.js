import { put } from 'redux-saga/effects';
import axios from '../../Axios-order';

import * as actions from '../Actions/index';

export function* initIngredientsSaga(action){
    try {
        const response = yield axios.get('https://react-my-burger-7d339.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(response.data))        
    }catch (error) {
        yield put(actions.fetchIngredientsFailed())
    }
       
}