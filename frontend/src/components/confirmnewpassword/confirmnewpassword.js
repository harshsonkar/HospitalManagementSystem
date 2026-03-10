import React, { useState,useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Copyright from '../Copyright/Copyright';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import { useAuth } from '../../contexts/authcontext';


const ConfirmNewPassword=()=>{
    const initialValues={
        password:'',
        ConfirmNewPassword:''
    }
    useEffect(() => {
        document.title = 'Confirm Password';
      });
    const classes=useStyles();
    const { userEmail,resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useNavigate();
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Required'),
        ConfirmNewPassowrd: Yup.string().required('Required')
    })
    const handleSubmit=async(values,props)=>{
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
        try{
            setMessage('')
            setError('')
            setLoading(true)
            if(values.password!==values.ConfirmNewPassword){
                return setError('password does not match')
            }
            await resetPassword(userEmail,values.password)
            setMessage('Pasword reset successfully')
            history('/login')

        } catch(error){
            console.log(error);
            setError('Failed to Reset Password')
        }
    }
    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper} elevation={10}>
                    <Avatar className={classes.avatar}>
                        <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Reset New Password
                    </Typography>

                    {error && <Alert severity="error" sx={{ my: 1, width:'100%' }} >{error}</Alert>}
                    {message && <Alert severity="info" sx={{ my: 1, width:'100%' }} >{message}</Alert>}
                    
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {(props) => (
                            <Form autoComplete="off">
                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    placeholder="Enter new password"
                                    name="password"
                                    autoFocus
                                    helperText={<ErrorMessage name="password" />}
                                />
                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="ConfirmNewPassword"
                                    label="ConfirmNewPassword"
                                    placeholder="confirm password"
                                    name="ConfirmNewPassword"
                                    autoFocus
                                    helperText={<ErrorMessage name="ConfirmNewPassword" />}
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
                                    onClick={() => {}}
                                >
                                    {loading ? "Loading..." : "Submit" }  
                                </Button>
                                        
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <Link component={RouterLink} to="/login" variant="body2" >
                                            {`Login instead?`}
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Link component={RouterLink} to="/signup" variant="body2">
                                            {"Need an account? Sign Up"}
                                        </Link>
                                    </Grid>                        
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

        </div>
    )

}

export default ConfirmNewPassword;