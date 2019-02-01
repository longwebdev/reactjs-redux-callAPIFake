import * as types from './../constants/ActionTypes';

var initialState = [];

const findIndex =  (products, id) => {
    var result = -1;
    products.forEach( (product, index) => {
        if(product.id === id){
            result = index;
        }
    });
    return result;
} 
var products =  (state = initialState, action) => {
    var index = -1;
    switch(action.type){
        case types.FETCH_PRODUCTS:
        state = action.products;
        return [...state];

        case types.DELETE_PRODUCT:
        var id = action.id;
        index = findIndex(state, id);
        state.splice(index, 1);
        return [...state];

        case types.ADD_PRODUCT:
        state.push(action.product);
         return [...state];
        
         case types.UPDATE_PRODUCT:
         index = findIndex(state ,action.product.id);
         state[index] = action.product;   
         return [...state];

        default :
        return [...state];
    }  
};
export default products; 