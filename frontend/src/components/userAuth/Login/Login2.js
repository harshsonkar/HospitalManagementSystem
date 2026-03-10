import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Link, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputAdornment, IconButton, Alert } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useAuth } from '../../../contexts/authcontext';


const LoginDoctor = () => {
    const  classes = useStyles();
    useEffect(() => {
        document.title = 'Login';
      });
    const initialValues = {
        email: '',
        password: '',
        showPassword: false
    }

    const [values, setValues] = useState(initialValues);
    const { login, currentUser,currentCounter,setUserEmail,setCounter,setCurrentCounter } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email').required('Required'),
        password: Yup.string().required('Required')
    });

    const handleSubmit = async(values, props) => {
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
            // setUserEmail('')
        }, 2000)

        try {
            setError('')
            setLoading(true)
            const response=await login(values.email, values.password)
            console.log('sdsdsd');
            console.log(response);
            setCounter(response);
            await setCurrentCounter(response);
            await setUserEmail(values.email);
            console.log(currentCounter)
            if(currentCounter=='1') history('/patient')
            else if(currentCounter=='2') history('/doctor')
            else {
                setError('please enter correct email and password.')
                // console.log(error);
            }

        } catch (error) {
            console.log(error);
            setError('Failed to Sign In')
        } 

        
        setLoading(false)
    }

    //TODO render admin to admin and have admin route
    useEffect(() => {
        if(currentUser!== null){
            if((currentUser.uid).includes('Mb9KHFgNNhYI4tbRCA1iEqjrkki1')){
                console.log("YOU ARE THE ADMIN")
            }
        }
    }, [currentUser])

    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper} elevation={10}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Log In
                    </Typography>

                    {error && <Alert severity="error" sx={{ my: 1, width:'100%' }} >{error}</Alert>}
                    
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form autoComplete="off">
                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    placeholder="Enter Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={<ErrorMessage name="email" />}
                                />

                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    helperText={<ErrorMessage name="password" />}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                />
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.submit}
                                    disabled={loading}
                                    // disabled={props.isSubmitting}
                                >
                                    {loading ? "Loading..." : "Sign In" }  
                                </Button>
                                        
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <Link component={RouterLink} to="/forgot-password" variant="body2">
                                            {`Forgot password ? `}
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Link component={RouterLink} to="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>                        
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                
            </Container>

        </>
    )
}

export default LoginDoctor;

