import React, { useEffect, useState } from 'react'
import { SwipeableDrawer, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { Stepper, Step, StepLabel, Container, Grid, TextField, Typography, Stack, InputLabel, IconButton, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory } from "react-router-dom";
import { useForm } from '../../Hooks/useForm'
import { deleteProduct, listDetail, updateProduct } from '../../Actions/actionProducts';
import { useDispatch } from 'react-redux';
import { useImages } from '../../Hooks/useImages';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';



const Input = styled('input')({
    display: 'none',
});






export default function DrawerEditar({ productos }) {
    const dispatch = useDispatch()
    let history = useHistory();

    console.log(productos.products.categoria)

    const {
        id,
        nombre,
        descripcion,
        marca,
        precio,
        categoria,
        capacidad,
        envioGratis,
        images } = productos.products;


    const [imagenes, handleFileChange] = useImages({ images })

    const [description, setDescription] = useState(descripcion)

    const handleClickFiles = () => {
        document.querySelector('#inputFileChanger').click()
    }

    const [values, handleInputChange, setValues, reset] = useForm({
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
        reset()
        setActiveStep(0)
    }

    const handleDescription = ({ target }) => {
        description[target.name] = target.value
    }
    const handleUpdate = () => {
        console.log(id)
        setValues({ ...values, descripcion: description })
        setValues({ ...values, images: imagenes.images })
        dispatch(updateProduct(id, values.nombre, description, marca, precio,categoria, capacidad, envioGratis, imagenes.images))
        dispatch(listDetail(values))
        setActiveStep(0)
    }
    const handleDelete = () => {
        dispatch(deleteProduct(id))
    }


    const list = (anchor) => (
        <>
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
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
                                    {['Informacion del producto',
                                        'Descripcion detallada del Producto',
                                        'Imagenes del producto',
                                        'Envio Gratis',
                                        'Actualizar Producto'].map((data, index) => (
                                            <Step key={index} >
                                                <StepLabel>{data}</StepLabel>
                                            </Step>
                                        ))}
                                </Stepper>
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    activeStep === 0 &&
                                    <>
                                        <TextField minRows={6} fullWidth label="Nombre" id="name" name="nombre" defaultValue={nombre} onChange={handleInputChange} sx={{marginBottom: 2 }} />
                                        <TextField minRows={6} fullWidth label="Marca" id="brand" name="marca" value={marca} onChange={handleInputChange} sx={{marginBottom: 2 }} />
                                        <TextField minRows={6} fullWidth label="Precio" id="name" name="precio" value={precio} onChange={handleInputChange} sx={{marginBottom: 2 }} />
                                        <TextField minRows={6} fullWidth label="Capacidad" id="name" name="capacidad" value={capacidad} onChange={handleInputChange} sx={{marginBottom: 2 }} />
                                        <InputLabel id="categoria">Categoria</InputLabel>
                                        <Select
                                            labelId="categoria"
                                            id="demo-simple-select"
                                            value={categoria}
                                            name="categoria"
                                            onChange={handleInputChange}
                                            fullWidth
                                            disabled
                                            
                                        >
                                            <MenuItem value={'Computadores'}>Computadores</MenuItem>
                                            <MenuItem value={'Portatiles'}>Portatiles</MenuItem>
                                            <MenuItem value={'Pantallas'}>Pantallas</MenuItem>
                                            <MenuItem value={'Accesorios'}>Accesorios</MenuItem>
                                        </Select>
                                    </>

                                }
                                {
                                    activeStep === 1 &&
                                    <>

                                        {['0', '1', '2', '3', '4'].map((data, index) => (
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label={`Descripcion ${Number(data) + 1} del producto`}
                                                multiline
                                                minRows={4}
                                                name={data}
                                                onChange={handleDescription}
                                                fullWidth
                                                margin="normal"
                                                value={descripcion[data]}

                                            />
                                        ))}

                                    </>
                                }
                                {
                                    activeStep === 2 &&
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}
                                        >
                                            <AddToPhotosIcon sx={{ color: '#299ac1', marginRight: '10px', fontSize: '35px' }} onClick={handleClickFiles} />
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="text"
                                                label="Seleccionar imagenes del emprendimiento"
                                                autoFocus
                                                readOnly={true}
                                                onClick={handleClickFiles}
                                                value={`Has seleccionado ${Object.values(imagenes.images).length} archivos`}
                                                disabled
                                            />
                                            <input
                                                type="file"
                                                id='inputFileChanger'
                                                multiple
                                                accept="image/*"
                                                hidden
                                                name="imagenes"
                                                onChange={handleFileChange}
                                            />
                                        </Box>

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
                                            fullWidth

                                        >
                                            <MenuItem value={true}>Si tiene envio gratis</MenuItem>
                                            <MenuItem value={false}>No tiene envio gratis</MenuItem>
                                        </Select>
                                    </>
                                }
                                {
                                    activeStep === 4 &&
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="h5" component="div">
                                            ¿Estas seguro que deseas cargar este producto?
                                        </Typography>
                                        <Box sx={{ padding: 2 }}>
                                            <Button variant="contained" onClick={handleUpdate} sx={{ marginRight: 2, marginLeft: 2 }} >Enviar</Button>
                                            <Button variant='outlined' onClick={handleReset} sx={{ marginRight: 2, marginLeft: 2 }}>Cancelar</Button>
                                        </Box>
                                    </Box>
                                }

                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
                                {
                                    activeStep < 4
                                        ?
                                        <><Button variant="contained" onClick={handleNextStep} sx={{ marginRight: 2, marginLeft: 2 }} >Siguiente</Button></>
                                        :
                                        ''
                                }
                                <Button variant="outlined" onClick={handlePrevStep} sx={{ marginRight: 2, marginLeft: 2 }}>Atras </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>

            </Box>
        </>
    );

    return (
        <>

            <Button onClick={toggleDrawer('top', true)} variant='contained' sx={{ color: 'white', marginRight: 2, backgroundColor: '#F3D184' }}><ModeEditOutlineIcon />EDITAR</Button>
            <Button onClick={toggleDrawer('top', true)} variant='contained' sx={{ color: 'white', backgroundColor: 'red' }} onClick={handleDelete}><DeleteOutlineRoundedIcon />ELIMINAR</Button>


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
