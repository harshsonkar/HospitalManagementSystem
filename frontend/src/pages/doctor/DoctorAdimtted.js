import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { useDB } from '../../contexts/dbstate'
import { mainListItems } from './DoctorListItems';
import Dashboard from '../../components/dashboard/dashboard';
import DoctorAdmittedTable from './DoctorAdmittedTable';

function createData(patientName,email, addmitDate, dischargeDate,roomID, status) {
    return { patientName,email, addmitDate, dischargeDate,roomID,status};
}

const rows = [
    createData('Jo-Anna Nkosi','utkarshrai5678@gmail.com' ,'2021-12-15', '2021-12-15','12', "active"),
    createData('Neville Muza','utkarshrai56@gmail.com', '2021-12-15', '2021-12-15','12', "not active"),
    createData('Tom Smith','utkarshrai@gmail.com', '2021-12-15', '2021-12-15','12', "not active"),
    createData('Bruce Wayne','utkarshrai1212@gmail.com', '2021-12-15', '2021-12-15','12',"active"),
    createData('Angela Alderson','utkarshraiqwqw@gmail.com', '2021-12-15', '2021-12-15','12',"active"),
    createData('Sarah Tomson','utkarshrai121122@gmail.com', '2021-12-15', '2021-12-15','12', "not active"),
];


const columns = [
    // { id: 'patientID', label: 'Patient ID', minWidth: 150 },
    { id: 'patientName', label: 'Patient Name', minWidth: 170},
    { id: 'addmitDate', label: 'Admit Date', minWidth: 170 },
    { id: 'dischargeDate', label: 'Discharge Date', minWidth: 170 },
    { id: "roomID", label:"Room ID",minWidth: 170},
    { id: 'status', label: 'Status', minWidth: 170 },
];


const DoctorAdmitted = () => {
    const  classes = useStyles();
    const { patientAdmitted } = useDB();

    return (
        <Dashboard title="Doctors Dashboard" mainListItems={mainListItems}>
            <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <Typography component="h1" variant="h4" color="primary">
                            Adimtted Patient
                        </Typography>
                        <Paper className={classes.paperContent} elevation={5} >
                            { patientAdmitted 
                                ? <DoctorAdmittedTable columns={columns} rows={patientAdmitted}/>
                                : <DoctorAdmittedTable columns={columns} rows={rows}/>
                            }    
                        </Paper>
                    </Grid>
                </Grid>
            </Container>  
        </Dashboard>
    )
}

export default DoctorAdmitted;
