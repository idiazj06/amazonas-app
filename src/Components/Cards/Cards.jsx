import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, CardMedia, Typography, Grid, Box, Button } from '@mui/material';
import { Link, useHistory } from "react-router-dom";
import { listDetail } from '../../Actions/actionProducts';






export default function Cards() {

    let history = useHistory();
    const dispatch = useDispatch()

    const productos = useSelector(store => store.products)
    const { products } = productos

    const handleNav = () =>{
        history.push("/addprod");
    }

    return (
        <Container>
            <Button onClick={handleNav}>Agregar nuevo producto</Button>
            {
                products.map(data => (
                    <Box >
                        <Link
                        to='/details'
                        onClick={()=>{dispatch(listDetail(data))}}>
                            <Card sx={{ marginTop: 5 }}>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center" >
                                    <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 240, padding: 2 }}
                                            image={data.images[2]}
                                            alt="Live from space album cover"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography component="div" variant="h5">
                                            {data.nombre}
                                        </Typography>
                                        <Typography component="div" variant="span">
                                            US$ {data.precio}
                                        </Typography>
                                        {data.envioGratis
                                            &&
                                            <Typography component="div" variant="span">
                                                Envío GRATIS a Colombia
                                            </Typography>
                                        }
                                    </Grid>
                                </Grid>
                            </Card>
                        </Link>
                    </Box>
                ))
            }
        </Container>
    )
}

