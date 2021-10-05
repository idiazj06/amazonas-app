import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "@firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { typesProducts } from "../Types/types";



export const deleteProduct = (id) => {
    return  async (dispatch,getState) => {
       

        await deleteDoc(doc(db, `productos`, `${id}`));
    }    
}



export const eliminar = (producto) => {
    return {
        type: typesProducts.eliminar,
        payload: producto
    }
}

export const updateProduct = (id,nombre, descripcion, marca, precio,categoria, capacidad, envioGratis, images) => {
    return  async (dispatch,getState) => {
        const newProduct = {
            nombre:nombre,
            descripcion:descripcion,
            marca:marca,
            precio:precio,
            categoria:categoria,
            capacidad:capacidad,
            envioGratis:envioGratis,
            images:images
        }
        console.log(newProduct)

        console.log(id)
        

        // console.log(id)

        const docRef = await doc(db, `productos`, `${id}`);

        await updateDoc(docRef,{
            nombre:nombre,
            descripcion:descripcion,
            marca:marca,
            precio:precio,
            capacidad:capacidad,
            envioGratis:envioGratis,
            images:images
        })
    }    
}



export const actualizar = (producto) => {
    return {
        type: typesProducts.actualizar,
        payload: producto
    }
}

export const crearProduct = ( nombre, descripcion, marca, precio,categoria, capacidad, envioGratis, images) => {
    return async (dispatch) => {
        const newProduct = {
            nombre,
            descripcion,
            marca,
            precio,
            categoria,
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
                id: producto.id,
                ...producto.data()
            })
        })
        dispatch(listar(productos))
        dispatch(listDetail(productos))
    }
}


export const listar = (productos) => {
    return {
        type: typesProducts.listar,
        payload: productos
    }
}

export const listDetail = (productos) => {
    return {
        type: typesProducts.detail,
        payload: productos
    }
}
