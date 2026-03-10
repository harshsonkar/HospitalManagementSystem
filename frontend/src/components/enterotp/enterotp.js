import React, { useState,useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Link, Grid, Box, Typography, Container } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Copyright from '../Copyright/Copyright';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import { useAuth } from '../../contexts/authcontext';


const EnterOtp=()=>{
    const initialValues={
        otp:''
    }
    useEffect(() => {
        document.title = 'Enter OTP';
      });
    const classes=useStyles();
    const { userEmail,matchOtp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useNavigate();
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required('Required'),
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
            const result=await matchOtp(userEmail,values.otp)
            // const result=true;
            if(!result){
                setError("OTP don't match");
            }
            else{
                history('/enternewpassword')
                setMessage('OTP verified successfully')
            }

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
                        <ShieldIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Confirm OTP
                    </Typography>

                    {error && <Alert severity="error" sx={{ my: 1, width:'100%' }} >{error}</Alert>}
                    {message && <Alert severity="info" sx={{ my: 1, width:'100%' }} >{message}</Alert>}
                    
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                        {(props) => (
                            <Form autoComplete="off">
                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="otp"
                                    placeholder="Enter OTP"
                                    name="otp"
                                    autoFocus
                                    helperText={<ErrorMessage name="otp" />}
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

export default EnterOtp;