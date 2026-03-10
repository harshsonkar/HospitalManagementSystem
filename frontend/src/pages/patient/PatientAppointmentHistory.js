import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import PatientTableModified from './patientTableModified';
import { useDB } from '../../contexts/dbstate';
import Dashboard from '../../components/dashboard/dashboard';
import { mainListItems } from './PatientListItems';
function createData(name, email,appointmentDate, appointmentTime,slotNumber) {
    return { name,email,appointmentDate, appointmentTime,slotNumber};
}

const rows = [
    createData('N/A', 'N/A', 'N/A', 'N/A', 'N/A'),
];

const columns = [
    { id: 'name', label: 'Doctor Name', minWidth: 150 },
    { id: 'email', label: 'email', minWidth: 170 },
    { id: 'appointmentDate', label: 'Appointment Date', minWidth: 170 },
    { id: 'appointmentTime', label: 'Appointment Time', minWidth: 170 },
    { id: 'slotNumber', label: 'Slot Number', minWidth: 170 },
    { id: 'prescription', label:'Prescription', minWidth:170 }
];


const PatientAppointmentHistory = () => {
    const  classes = useStyles();

    const { userAppointments } = useDB();

    return (
        <Dashboard title="Patient Dashboard" mainListItems={mainListItems}>
            <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography component="h1" variant="h4" color="primary">
                            Appointment History
                        </Typography>
                        <Paper className={classes.paperContent} elevation={5}>
                            {userAppointments 
                                ? <PatientTableModified columns={columns} rows={userAppointments}/>
                                : <PatientTableModified columns={columns} rows={rows}/>
                            }    
                        </Paper>
                    </Grid>
                </Grid>
            </Container>  
        </Dashboard>
    )
}

export default PatientAppointmentHistory
