import React from 'react';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';
import { useAuth } from '../../contexts/authcontext'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import useStyles from './styles';

const PatientDashboard = () => {
    const  classes = useStyles();
    const { currentUser } = useAuth();

    return (
        <>
            <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3} >
                    <Grid item lg={12} md={12} sm={12}>
                        <Typography component="h1" variant="h4" color="primary" gutterBottom >
                            Welcome ({currentUser.displayName || currentUser.email})
                        </Typography>            
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card className={classes.card}>
                            <CardContent >
                                <Card className={classes.cardIcon}>
                                    <BsIcons.BsCalendar />
                                </Card>
                                <div className={classes.cardContent}>    
                                    <Typography className={classes.cardTitle} variant="h5" component="h1">
                                        Book Appointment 
                                    </Typography>
                                    <Typography variant="subtitle2"  color="text.secondary"
                                    textAlign="center"
                                    >
                                        Request to see a doctor.
                                    </Typography>
                                </div>        
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <Button 
                                    variant="outlined" 
                                    component={Link} 
                                    to="/patient/appointments"
                                >
                                    Book Appointment
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card className={classes.card}>
                            <CardContent >
                                <Card className={classes.cardIcon}>
                                    <BsIcons.BsClockHistory />
                                </Card>
                                <div className={classes.cardContent}>    
                                    <Typography className={classes.cardTitle} variant="h5" component="h1">
                                        My Appointments
                                    </Typography>
                                    <Typography 
                                        variant="subtitle2"
                                        color="text.secondary"
                                        textAlign="center"
                                    >
                                        View Appointment History.
                                    </Typography>
                                </div>        
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <Button 
                                    variant="outlined"
                                    component={Link} 
                                    to="/patient/appointment-history"
                                >
                                    View History
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4} >
                        <Card className={classes.card}>
                            <CardContent >
                                <Card className={classes.cardIcon}>
                                    <BsIcons.BsClockHistory />
                                </Card>
                                <div className={classes.cardContent}>    
                                    <Typography className={classes.cardTitle} variant="h5" component="h1">
                                        Reviews
                                    </Typography>
                                    <Typography 
                                        variant="subtitle2"
                                        color="text.secondary"
                                        textAlign="center"
                                    >
                                        Review Our Team.
                                    </Typography>
                                </div>        
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <Button 
                                    variant="outlined"
                                    component={Link} 
                                    to="/patient/review"
                                >
                                    View History.
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card className={classes.card}>
                            <CardContent >
                                <Card className={classes.cardIcon}>
                                    <ContactPageIcon style={{fontSize: '32px'}} />
                                </Card>
                                <div className={classes.cardContent}>    
                                    <Typography className={classes.cardTitle} variant="h5" component="h1">
                                        Contact Us
                                    </Typography>
                                    <Typography 
                                        variant="subtitle2"
                                        color="text.secondary"
                                        textAlign="center"
                                    >
                                        Contact our hospital team for more info.
                                    </Typography>
                                </div>        
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <Button 
                                    variant="outlined"
                                    component={Link} 
                                    to="/patient/contact-us"
                                >
                                    Contact Us
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                
                </Grid>
            </Container>
        </>
    )
}

export default PatientDashboard
