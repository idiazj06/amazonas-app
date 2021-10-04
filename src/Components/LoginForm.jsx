import React from 'react'
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from '../Hooks/useForm'
import { loginEmailPassword, loginGoogle } from '../Actions/actionLogin';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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
                        >
                            <GoogleIcon sx={{ marginRight: 2 }} />Continuar con google
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
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
