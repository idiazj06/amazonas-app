import { addDoc, collection, getDocs } from "@firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { typesProducts } from "../Types/types";



export const crearProduct = (nombre, descripcion, marca, precio, capacidad, envioGratis, images) => {
    return async (dispatch) => {
        const newProduct = {
            nombre,
            descripcion,
            marca,
            precio,
            capacidad,
            envioGratis,
            images
        }
        addDoc(collection(db,"productos"),newProduct)
        .then(resp=>{
            dispatch(crear(newProduct))
            console.log(newProduct)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}




export const crear = (producto) => {
    return {
        type: typesProducts.crear,
        payload: producto
    }
}



export const listProduct = () => {
    return async (dispatch) => {
        const querySnapshot = await getDocs(collection(db, "productos"))
        const productos = []
        querySnapshot.forEach((producto) => {
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

