import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cards from '../Components/Cards/Cards'
import ProductsForm from '../Components/ProductsForm'
import { listProduct } from '../Actions/actionProducts';


export default function Products() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProduct())
    }, [])



    return (
        <div>
            <Cards/>
        </div>
    )
}
