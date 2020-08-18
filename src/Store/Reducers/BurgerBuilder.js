import * as actionTypes from '../Actions/ActionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null, 
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const addIngredient = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        ingredients:updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIng = updateObject(state.ingredients, updateIng);
    const updateSt = {
        ingredients:updatedIng,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updateSt);

};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    })
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
};
//primero se implementa en burgerBuilder

const Reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: fetchIngredientsFailed(state, action);
        break
        default: return state;
    }
};

export default Reducer;