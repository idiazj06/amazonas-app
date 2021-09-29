import {types} from '../Types/types'


export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                id: action.payload.id,
                name:action.payload.displayName
            }

            default:
                return state
    }
}