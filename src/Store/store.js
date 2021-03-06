import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { loginReducer } from '../Reducers/loginReducer'
import { registerReducer } from '../Reducers/registerReducer'
import { addProductReducer, deleteProductReducer, getDetailReducer, getProductReducer, updateProductReducer } from '../Reducers/productReducer'


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    products: getProductReducer,
    createProd : addProductReducer,
    addDetail : getDetailReducer,
    updateProd : updateProductReducer,
    deleteProd: deleteProductReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)