import React, { useEffect, useState } from 'react'
import { SwipeableDrawer, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { Stepper, Step, StepLabel, Container, Grid, TextField, Typography, Stack, InputLabel, IconButton, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory } from "react-router-dom";
import { useForm } from '../../Hooks/useForm'
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { listDetail, updateProduct } from '../../Actions/actionProducts';
import { useDispatch } from 'react-redux';
import { fileUpload } from '../../Helpers/FileUpload';
import { useImages } from '../../Hooks/useImages';


const Input = styled('input')({
    display: 'none',
});


export default function DrawerEditar({ productos }) {
    const dispatch = useDispatch()
    let history = useHistory();

    const {
        id,
        nombre,
        descripcion,
        marca,
        precio,
        capacidad,
        envioGratis,
        images } = productos.products;


    const [imagenes, handleFileChange] = useImages({ images })

    const [description, setDescription] = useState(descripcion)

    const [data, setData] = useState({
        id: id,
        nombre: nombre,
        descripcion: description,
        marca: marca,
        precio: precio,
        capacidad: capacidad,
        envioGratis: envioGratis,
        images: imagenes.images

    })

    const [values, handleInputChange,setValues] = useForm({
        id: id,
        nombre: nombre,
        descripcion: description,
        marca: marca,
        precio: precio,
        capacidad: capacidad,
        envioGratis: envioGratis,
        images: imagenes.images
      })

    const [state, setState] = useState({
        top: false,
    });
    const [activeStep, setActiveStep] = useState(0)


    const handleNav = () => {
        history.push("/products");
    }

    // const handleInputChange = ({ target }) => {
    //     setData({
    //         ...data,
    //         [target.name]: target.value
    //     })
    // }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    //Manejadores Stepper
    const handleNextStep = () => {
        if (activeStep < 4) {
            setActiveStep((actual) => actual + 1)
            // setData({ ...data, descripcion: description })
        }
    }

    const handlePrevStep = () => {
        if (activeStep > 0) {
            setActiveStep((actual) => actual - 1)
        }
    }
    const handleReset = () => {
    }

    const handleDescription = ({ target }) => {
        description[target.name] = target.value
    }
    const handleUpdate = () => {
        console.log(id)
        setValues({ ...values, descripcion: description })
        setValues({ ...values, images: imagenes.images })
        dispatch(updateProduct(id, values.nombre, description, marca, precio, capacidad, envioGratis, imagenes.images))
        dispatch(listDetail(values))
    }


    const list = (anchor) => (
        <>
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
            > <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                </Box>
                <Container >
                    <Button onClick={handleNav}>Volver al inicio</Button>
                    <Box
                        component="form"

                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stepper activeStep={activeStep}>
                                    <Step>
                                        <StepLabel>Descripcion del Producto</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Descripcion detallada del Producto</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Imagenes del producto</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>Envio Gratis</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>cinco</StepLabel>
                                    </Step>
                                </Stepper>
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    activeStep === 0 &&
                                    <>
                                        <TextField minRows={6} fullWidth label="Nombre" id="name" name="nombre" defaultValue={nombre} onChange={handleInputChange} />
                                        <TextField minRows={6} fullWidth label="Marca" id="brand" name="marca" value={marca} onChange={handleInputChange} />
                                        <TextField minRows={6} fullWidth label="Precio" id="name" name="precio" value={precio} onChange={handleInputChange} />
                                        <TextField minRows={6} fullWidth label="Capacidad" id="name" name="capacidad" value={capacidad} onChange={handleInputChange} />
                                    </>

                                }
                                {
                                    activeStep === 1 &&
                                    <>
                                        <InputLabel id="label-textarea">Descripcion 1</InputLabel>
                                        <TextareaAutosize
                                            labelId="label-textarea"
                                            minRows={6}
                                            placeholder="Ingrese descripcion uno del producto"
                                            style={{ width: 500 }}
                                            defaultValue={descripcion[0]}
                                            name="0"
                                            className="cuadro"
                                            onChange={handleDescription}

                                        />
                                        <InputLabel id="label-textarea">Descripcion 2</InputLabel>
                                        <TextareaAutosize
                                            labelId="label-textarea"
                                            minRows={6}
                                            placeholder="Ingrese descripcion dos del producto"
                                            style={{ width: 500 }}
                                            defaultValue={descripcion[1]}
                                            name="1"
                                            className="cuadro"
                                            onChange={handleDescription}

                                        />
                                        <InputLabel id="label-textarea">Descripcion 3</InputLabel>
                                        <TextareaAutosize
                                            labelId="label-textarea"
                                            minRows={6}
                                            placeholder="Ingrese descripcion tres del producto"
                                            style={{ width: 500 }}
                                            defaultValue={descripcion[2]}
                                            name="2"
                                            onChange={handleDescription}
                                        // className="cuadro"

                                        />
                                        <InputLabel id="label-textarea">Descripcion 4</InputLabel>
                                        <TextareaAutosize
                                            labelId="label-textarea"
                                            minRows={6}
                                            placeholder="Ingrese descripcion cuatro del producto"
                                            style={{ width: 500 }}
                                            defaultValue={descripcion[3]}
                                            name="3"
                                            onChange={handleDescription}
                                        // className="cuadro"

                                        />
                                        <InputLabel id="label-textarea">Descripcion 5</InputLabel>
                                        <TextareaAutosize
                                            labelId="label-textarea"
                                            minRows={6}
                                            placeholder="Ingrese descripcion cinco del producto"
                                            style={{ width: 500 }}
                                            defaultValue={descripcion[4]}
                                            name="4"
                                            onChange={handleDescription}
                                        // className="cuadro"

                                        />
                                    </>
                                }
                                {
                                    activeStep === 2 &&
                                    <>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <label htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" multiple type="file" name="images" onChange={handleFileChange} />
                                                <Button variant="contained" component="span">
                                                    Upload
                                                </Button>
                                            </label>
                                            <label htmlFor="icon-button-file">
                                                <Input accept="imagess/*" id="icon-button-file" type="file" multiple name="images" onChange={handleFileChange} />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <PhotoCamera />
                                                </IconButton>
                                            </label>
                                        </Stack>
                                    </>
                                }
                                {
                                    activeStep === 3 &&
                                    <>
                                        <InputLabel id="demo-simple-select-label">Tipo de envio</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={envioGratis}
                                            label="Tipo de envio"

                                        >
                                            <MenuItem value={true}>Si tiene envio gratis</MenuItem>
                                            <MenuItem value={false}>No tiene envio gratis</MenuItem>
                                        </Select>
                                    </>
                                }
                                {
                                    activeStep === 4 &&
                                    <>
                                        <Typography variant="h5" component="div">
                                            Estas seguro que deseas cargar este producto?
                                        </Typography>
                                        <Button variant="contained" onClick={handleUpdate} >Enviar</Button>
                                        <Button variant='contained' onClick={handleReset}>Cancelar</Button>
                                    </>
                                }

                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: 2 }}>
                                {
                                    activeStep < 4
                                        ?
                                        <><Button variant="outlined" onClick={handleNextStep} >Siguiente</Button></>
                                        :
                                        ''
                                }
                                <Button variant="outlined" onClick={handlePrevStep} >Atras </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

            </Box>
        </>
    );

    return (
        <>
            <Button onClick={toggleDrawer('top', true)} variant='contained' sx={{ color: 'white' }}>EDITAR</Button>

            <SwipeableDrawer
                anchor={'top'}
                open={state['top']}
                onClose={toggleDrawer('top', false)}
                onOpen={toggleDrawer('top', true)}
            >
                {list('top')}
            </SwipeableDrawer>
        </>
    )
}
