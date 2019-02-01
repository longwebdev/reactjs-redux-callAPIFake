import * as types from './../constants/ActionTypes';
import apiCaller from './../utils/apiCaller';

export const actFetchProductRequest =  () => {
    return  (dispatch) => {
        return apiCaller('products', 'GET', null).then(res =>{
            dispatch(actFetchProduct(res.data));
        });
    }; 
} 

export const actFetchProduct =  (products) => {
    return {
        type : types.FETCH_PRODUCTS,
        products 
    }
} 

export const actDeleteProductRequest =  (id) => {
    return  (dispatch) => {
        return apiCaller(`products/${id}`, 'DELETE', null).then(res =>{
            dispatch(actDeleteProduct(id));
        });
    }; 
} 

export const actDeleteProduct =  (id) => {
    return {
        type : types.DELETE_PRODUCT,
        id
    }
} 

export const actADDProductRequest =  (product) => {
    return  (dispatch) => {
        return apiCaller('products', 'POST', product).then(res =>{
            dispatch(actAddProduct(res.data));
        });
    }; 
}

export const actAddProduct = (product) =>{
    return {
        type : types.ADD_PRODUCT,
        product
    }
}

export const actGetProductRequest =  (id) => {
    return  (dispatch) => {
        return apiCaller(`products/${id}`, 'GET', null).then(res =>{
            dispatch(actGetProduct(res.data));
        });
    }; 
} 

export const actGetProduct =  (product) => {
    return {
        type : types.EDIT_PRODUCT,
        product
    }
} 

export const actUpdateProductRequest =  (product) => {
    return  (dispatch) => {
        return apiCaller(`products/${product.id}`, 'PUT', product).then(res =>{
            dispatch(actUpdateProduct(res.data));
        });
    }; 
} 

export const actUpdateProduct = (product) => {
    return {
        type : types.UPDATE_PRODUCT,
        product
    }
}
