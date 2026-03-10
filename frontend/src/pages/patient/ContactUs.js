import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import useStyles from './styles1';
import PatientTableModified from './patientTableModified';
import { useDB } from '../../contexts/dbstate';
import Dashboard from '../../components/dashboard/dashboard';
import { mainListItems } from './PatientListItems';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
// import useStyles from './styles1';
// import { useDB } from '../../contexts/dbstate';
const ContactUs=()=>{
    const  classes = useStyles();
    const {currentUser}=useAuth();
    const {supportDetail}=useDB();
    return(
        <Dashboard title="Patient Dashboard" mainListItems={mainListItems}>
           <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3} >
                    <Grid item lg={12} md={12} sm={12}>
                        <Typography component="h1" variant="h4" color="primary" gutterBottom >
                            Welcome ({currentUser.displayName || currentUser.email})
                        </Typography>            
                    </Grid>
                    {
                                    supportDetail.map((val)=>{
                                        return(
                                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                            <Card className={classes.card}>
                                                <CardContent >
                                                    <Card className={classes.cardIcon}>
                                                        <img src={val.photoURL} alt="photoURL"/>
                                                    </Card>
                                                    <div className={classes.cardContent}>    
                                                        <Typography className={classes.cardTitle} variant="h5" component="h1">
                                                            {val.name}
                                                        </Typography>
                                                        <Typography 
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            textAlign="center"
                                                        >   
                                                            Role: {val.role}
                                                        </Typography>
                                                        <Typography 
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            textAlign="center"
                                                        >   
                                                            Email: {val.email}
                                                        </Typography>
                                                        <Typography 
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            textAlign="center"
                                                        >   
                                                            Phone No: {val.phone_no}
                                                        </Typography>
                                                    </div>        
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        );
                                    })
                                }
                
                </Grid>
            </Container>
        </Dashboard>
    );
}

export default ContactUs;