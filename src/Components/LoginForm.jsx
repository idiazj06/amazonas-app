import React from 'react'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from '../Hooks/useForm'
import { loginEmailPassword, loginFacebook, loginGoogle } from '../Actions/actionLogin';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://github.com/idiazj06">
                Amazonas
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function LoginForm() {

    const validationSchema = Yup.object({
        email: Yup
            .string('Enter your email')
            .email('Ingresa un Email valido')
            .required('El campo Email es requerido'),
        password: Yup
            .string('Enter your password')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('El campo Contraseña es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            // e.preventDefault();
            dispatch(loginEmailPassword(email, password))
        },
    });

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = values

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginEmailPassword(email, password))
    };

    const handleGoogle = (e) => {
        dispatch(loginGoogle())
    };
    const handleFacebook = (e) => {
        dispatch(loginFacebook())
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src="https://res.cloudinary.com/duaokxfsp/image/upload/v1632869904/Amazonas/logo-amazon_1_yj6mkj.png" alt="" />

                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="h1" variant="h5">
                            Iniciar Sesion
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleGoogle}
                            sx={{backgroundColor:'#DE5246',marginTop:2,marginBottom:1}}
                        >
                            <GoogleIcon sx={{ marginRight: 2 }} />Continuar con Google
                        </Button>

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleFacebook}
                            sx={{marginBottom:3}}
                        >
                            <FacebookOutlinedIcon sx={{ marginRight: 2 }} />Continuar con Facebook
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                        >
                            Iniciar sesion
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link to="/auth/register" variant="body2">
                                    {"¿Aun no tienes una cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
