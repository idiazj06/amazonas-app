import { addDoc, collection, getDocs } from "@firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { typesProducts } from "../Types/types";







export const listProduct = () => {
    return async (dispatch) =>{
        const querySnapshot = await getDocs (collection(db,"productos"))
        const productos = []
        querySnapshot.forEach((producto)=>{
            productos.push({
                ...producto.data()
            })
        })
        dispatch(list(productos))
    }
}

export const list = (productos) => {
    return {
        type: typesProducts.listar,
        payload: productos
    }
}

