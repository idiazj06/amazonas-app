import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Box, Typography, Divider, Button } from '@mui/material';
import ReactImageMagnify from "react-image-magnify";
import DrawerEditar from './DrawerEditar';

export default function DetailsCard() {



    const productos = useSelector(store => store.addDetail)

    

    const { images, nombre, marca, precio, envioGratis, descripcion } = productos.products
    const [imgMostrar, setImgMostrar] = useState(`${images[0]}`)
    console.log(images)

    return (
        <div>
            <Box container sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={1}  >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                images.map((img, index) => (
                                    <img
                                        src={img}
                                        key={index}
                                        alt=""
                                        onClick={() => { setImgMostrar(img) }}
                                    />
                                ))
                            }



                        </Box>
                    </Grid>
                    <Grid item xs={8} md={4} >
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: imgMostrar
                            },
                            largeImage: {
                                src: imgMostrar,
                                width: 1200,
                                height: 1800
                            }
                        }} />
                    </Grid>
                    <Grid item xs={8} md={4.5}>
                        <Typography component="div" variant="h5">
                            {nombre}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            Marca:{marca}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle1" gutterBottom component="span">
                            Precio:<Typography variant="h6" gutterBottom component="span"> ${precio}</Typography>
                            {envioGratis &&
                                <Typography variant="subtitle1" gutterBottom component="span"> Envio GRATIS</Typography>}
                        </Typography>
                        <ul>
                            {
                                descripcion.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))
                            }
                        </ul>

                    </Grid>
                    <Grid item xs={8} md={2.5}>
                    <DrawerEditar productos={productos}/>
                           
                    </Grid>

                    

                </Grid>
            </Box>
        </div>
    )
}
