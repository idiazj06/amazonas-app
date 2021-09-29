import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Container, CardMedia, Typography, Grid, Box, Paper } from '@mui/material';
import { positions } from '@mui/system';




export default function Cards() {

    const productos = useSelector(store => store.products)
    const { products } = productos

    console.log(products)

    return (
        <Container>
            {
                products.map(data => (

                    <Box >
                        <Card  sx={{marginTop:5}}>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center" >
                                <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 240, padding: 2 }}
                                        image={data.images[0]}
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
                    </Box>


                ))
            }
        </Container>
    )
}

