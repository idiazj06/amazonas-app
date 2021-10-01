import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Container, Box, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useForm } from '../Hooks/useForm'
import { useDispatch } from 'react-redux';
import { fileUpload } from '../Helpers/FileUpload';
import { crearProduct } from '../Actions/actionProducts'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useHistory } from "react-router-dom";



const Input = styled('input')({
  display: 'none',
});




export default function ProductsForm() {
  let history = useHistory();

  const dispatch = useDispatch()

  const [tipoEnvio, setTipoEnvio] = useState(true)
  const [description, setDescription] = useState('')
  const [imagenes, setImagenes] = useState('')

  const [values, handleInputChange, reset] = useForm({
    nombre: '',
    descripcion: '',
    marca: '',
    precio: '',
    capacidad: '',
    envioGratis: '',
    images: ''
  })

  let { nombre, descripcion, marca, precio, capacidad, envioGratis, images } = values;



  let prueba = []
  let descripcionValues = ''


  const handleFileChange = e => {
    const files = e.target.files


    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      fileUpload(file)
        .then(resp => {
          prueba.push(resp)
          console.log(resp)
          setImagenes(prueba)
        }).catch(err => {
          console.log(err.message)
        })

    }
  }  

  const handleEnvio = (e) => {
    setTipoEnvio(e.target.value)
    console.log(tipoEnvio)
  }

  let timeout = null;
  const handleDescription = ({ target }) => {
    
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(() => setDescription([...description,target.value])    
    , 500)
  
  }

  const handleReset = () => {
    reset()
    setActiveStep(0)
  }


  //Manejadores Stepper
  const [activeStep, setActiveStep] = useState(0)

  const handleNextStep = () => {
    console.log(description)
    console.log(prueba)
    console.log(imagenes)
    if (activeStep < 4) {
      setActiveStep((actual) => actual + 1)
    }

  }
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((actual) => actual - 1)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(tipoEnvio)
    images = imagenes
    envioGratis = tipoEnvio
    descripcion = description
    dispatch(crearProduct(nombre, descripcion, marca, precio, capacidad, envioGratis, images))
    setActiveStep(0)
  }

  const handleNav = () =>{
    history.push("/products");
}



  return (
    <>
      <Container >
        <Button onClick={handleNav}>Volver al inicio</Button>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
                  <TextField fullWidth label="Nombre" id="name" name="nombre" onChange={handleInputChange} value={nombre} />
                  <TextField fullWidth label="Marca" id="brand" name="marca" onChange={handleInputChange} value={marca} />
                  <TextField fullWidth label="Precio" id="name" name="precio" onChange={handleInputChange} value={precio} />
                  <TextField fullWidth label="Capacidad" id="name" name="capacidad" onChange={handleInputChange} value={capacidad} />
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
                    onKeyUp={handleDescription}
                    name="0"
                    className="cuadro"

                  />
                  <InputLabel id="label-textarea">Descripcion 2</InputLabel>
                  <TextareaAutosize
                    labelId="label-textarea"
                    minRows={6}
                    placeholder="Ingrese descripcion dos del producto"
                    style={{ width: 500 }}
                    onKeyUp={handleDescription}
                    name="1"
                    className="cuadro"

                  />
                  <InputLabel id="label-textarea">Descripcion 3</InputLabel>
                  <TextareaAutosize
                    labelId="label-textarea"
                    minRows={6}
                    placeholder="Ingrese descripcion tres del producto"
                    style={{ width: 500 }}
                    onKeyUp={handleDescription}
                    name="2"
                  // className="cuadro"

                  />
                  <InputLabel id="label-textarea">Descripcion 4</InputLabel>
                  <TextareaAutosize
                    labelId="label-textarea"
                    minRows={6}
                    placeholder="Ingrese descripcion cuatro del producto"
                    style={{ width: 500 }}
                    onKeyUp={handleDescription}
                    name="3"
                  // className="cuadro"

                  />
                  <InputLabel id="label-textarea">Descripcion 5</InputLabel>
                  <TextareaAutosize
                    labelId="label-textarea"
                    minRows={6}
                    placeholder="Ingrese descripcion cinco del producto"
                    style={{ width: 500 }}
                    onKeyUp={handleDescription}
                    name="4"
                  // className="cuadro"

                  />
                </>
              }
              {
                activeStep === 2 &&
                <>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" name="images" onChange={handleFileChange} value={images} />
                      <Button variant="contained" component="span">
                        Upload
                      </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                      <Input accept="imagess/*" id="icon-button-file" type="file" multiple name="images" onChange={handleFileChange} value={images} />
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
                    value={tipoEnvio}
                    label="Tipo de envio"
                    onChange={handleEnvio}
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
                  <Button variant="contained" type="submit" >Enviar</Button>
                  <Button variant='contained' onClick={handleReset}>Cancelar</Button>
                </>
              }

            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={handleNextStep}
              >
                Siguiente
              </Button>
              <Button
                variant="outlined"
                onClick={handlePrevStep}
              >
                Atras
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

    </>
  );
}