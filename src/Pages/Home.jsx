import React, { useEffect } from 'react'
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { listProduct } from '../Actions/actionProducts';
import Banner from '../Components/Banner/Banner'

export default function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProduct())
    }, [])



    return (
        <>
            <Banner />
            <Container>
            </Container>
        </>
    )
}
