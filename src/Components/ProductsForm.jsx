import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Container, Box, Grid, TextField, Typography, Stack, InputLabel, IconButton, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from '../Hooks/useForm'
import { useDispatch } from 'react-redux';
import { fileUpload } from '../Helpers/FileUpload';
import { crearProduct } from '../Actions/actionProducts'
import { useHistory } from "react-router-dom";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Input = styled('input')({
  display: 'none',
});

export default function ProductsForm() {
  let history = useHistory();
  const dispatch = useDispatch()

  const [description, setDescription] = useState([])
  const [imagenes, setImagenes] = useState([]);
  const [activeStep, setActiveStep] = useState(0)

  const [values, handleInputChange, reset, setValues] = useForm({
    nombre: '',
    descripcion: '',
    marca: '',
    precio: '',
    categoria: '',
    capacidad: '',
    envioGratis: '',
    images: ''
  })
  let { nombre, descripcion, marca, precio, categoria, capacidad, envioGratis, images } = values;

  const handleClickFiles = () => {
    document.querySelector('#inputFileChanger').click()
  }

  const handleUploadImage = (e) => {
    const files = e.target.files
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      fileUpload(file)
        .then(resp => {
          imagenes[i] = resp
          setValues({ ...values, images: imagenes })
        }).catch(err => {
          console.log(err.message)
        })
    }
  }

  const handleDescription = ({ target }) => {
    description[target.name] = target.value
    setValues({ ...values, descripcion: description })
  }

  const handleReset = () => {
    reset()
    setImagenes([])
    setDescription([])
    setActiveStep(0)
  }

  //Manejadores Stepper
  const handleNextStep = () => {
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
    console.log(values)
    console.log(imagenes)
    dispatch(crearProduct(nombre, descripcion, marca, precio, categoria, capacidad, envioGratis, images))
    reset()
    setImagenes([])
    setDescription([])
    setActiveStep(0)
  }

  const handleNav = () => {
    history.push("/");
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
                {['Informacion del producto',
                  'Descripcion detallada del Producto',
                  'Imagenes del producto',
                  'Envio Gratis',
                  'Cargar Producto'].map((data, index) => (
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
                  <TextField fullWidth label="Nombre" id="name" name="nombre" onChange={handleInputChange} value={nombre} sx={{ marginBottom: 2 }} />
                  <TextField fullWidth label="Marca" id="brand" name="marca" onChange={handleInputChange} value={marca} sx={{ marginBottom: 2 }} />
                  <TextField fullWidth label="Precio" id="name" name="precio" onChange={handleInputChange} value={precio} sx={{ marginBottom: 2 }} />
                  <TextField fullWidth label="Capacidad" id="name" name="capacidad" onChange={handleInputChange} value={capacidad} sx={{ marginBottom: 2 }} />
                  <InputLabel id="categoria">Categorias</InputLabel>
                  <Select
                    labelId="categoria"
                    id="demo-simple-select"
                    value={values.categoria}
                    name="categoria"
                    onChange={handleInputChange}
                    fullWidth
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
                      value={`Has seleccionado ${Object.keys(imagenes).length} archivos`}
                      disabled
                    />
                    <input
                      type="file"
                      id='inputFileChanger'
                      multiple
                      accept="image/*"
                      hidden
                      name="imagenes"
                      onChange={handleUploadImage}
                    />
                  </Box>
                </>
              }
              {
                activeStep === 3 &&
                <>
                  <InputLabel id="tipoEnvioLabel">Tipo de envio</InputLabel>
                  <Select
                    labelId="tipoEnvioLabel"
                    id="demo-simple-select"
                    value={envioGratis}
                    label="Tipo de envio"
                    onChange={handleInputChange}
                    name="envioGratis"
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
                    Estas seguro que deseas cargar este producto?
                  </Typography>
                  <Box sx={{padding:2}}>
                    <Button variant="contained" type="submit" sx={{ marginRight: 2, marginLeft: 2 }}>Enviar</Button>
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
              <Button
                variant="outlined"
                onClick={handlePrevStep}
                sx={{ marginRight: 2, marginLeft: 2 }}
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