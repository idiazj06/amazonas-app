import { types } from '../Types/types'
import { typesProducts } from '../Types/types'


const initialState = {
    products: []
}

export const addProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesProducts.listar:
            return {
                products: action.payload
            }

        default:
            return state;

    }
}
