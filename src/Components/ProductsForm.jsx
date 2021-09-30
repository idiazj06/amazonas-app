import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useForm } from '../Hooks/useForm'
import { useDispatch } from 'react-redux';
import { fileUpload } from '../Helpers/FileUpload';
import {crearProduct} from '../Actions/actionProducts'


const Input = styled('input')({
  display: 'none',
});




export default function ProductsForm() {

  const dispatch = useDispatch()

  const [values, handleInputChange, reset] = useForm({
    nombre: '',
    descripcion: '',
    marca: '',
    precio: '',
    capacidad: '',
    envioGratis: '',
    images: ''
  })

  let { nombre,descripcion,marca, precio,capacidad,envioGratis,images } = values;

  let prueba = []

  const handleFileChange = e => {
    const files = e.target.files


    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      fileUpload(file)
        .then(resp => {
          prueba.push(resp)
          console.log(resp)
        }).catch(err => {
          console.log(err.message)
        })

    }



  }

  const showPrueba = () =>{
    // console.log(prueba)
    // images=prueba

    // console.log(images)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    images=prueba
    console.log(images)
    dispatch(crearProduct(nombre,descripcion,marca,precio,capacidad,envioGratis,images))
  }




  return (
    <Container sx={{ marginTop: 10 }}>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField fullWidth label="Nombre" id="name" name="nombre" onChange={handleInputChange}  value={nombre}/>
        <TextField fullWidth label="Descripcion" id="description" name="descripcion" onChange={handleInputChange}  value={descripcion}/>
        <TextField fullWidth label="Marca" id="brand" name="marca" onChange={handleInputChange}  value={marca}/>
        <TextField fullWidth label="Precio" id="name" name="precio" onChange={handleInputChange}  value={precio}/>
        <TextField fullWidth label="Capacidad" id="name" name="capacidad" onChange={handleInputChange}  value={capacidad}/>
        <TextField fullWidth label="Envio Gratis" id="name" name="envioGratis" onChange={handleInputChange}  value={true}/>


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
        <Button variant="contained" component="span" type='submit' >
          Upload
        </Button>
        <button type="submit">ENVIAR</button>
      </Box>
    </Container>
  );
}