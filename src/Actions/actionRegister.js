import { createUserWithEmailAndPassword, getAuth, updateProfile } from '@firebase/auth'
import {types} from '../Types/types'

export const registroEmailPasswordNombre = (email,password,name)=>{
    return(dispatch)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
        .then(async({user})=>{
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            console.log(user)
            dispatch(registerSincrono(user.email, user.uid, user.displayName))
        })
        .catch(e=>{
            console.log(e)
        })
    }
}

export const registerSincrono = (email,password,name) =>{
    return{
        type:types.register,
        payload: {
            email,
            password,
            name
        }
    }
}