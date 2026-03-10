import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { useDB } from '../../contexts/dbstate'
import { mainListItems } from './DoctorListItems';
import Dashboard from '../../components/dashboard/dashboard';
import ReviewTable from './ReviewTable';
import Rating from '@mui/material/Rating';

function createData(patientName,email, review_number) {
    return { patientName,email,review_number};
}

const rows = [
    createData('Jo-Anna Nkosi','utkarshrai@5678@gmail.com','0'),
    createData('Neville Muza','utkarshrai56@gmail.com','3'),
    createData('Tom Smith','utkarshrai@gmail.com', '2'),
    createData('Bruce Wayne','utkarshrai1212@gmail.com', '4'),
    createData('Angela Alderson','utkarshraiqwqw@gmail.com', '5'),
    createData('Sarah Tomson','utkarshrai121122@gmail.com', '1'),
];


const columns = [
    // { id: 'patientID', label: 'Patient ID', minWidth: 150 },
    { id: 'patientName', label: 'Patient Name', minWidth: 170},
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'review_number', label: 'Review', minWidth: 170 },
];


const DoctorReviews = () => {
    const  classes = useStyles();
    const { doctorReviews,averageReview } = useDB();

    return (
        <Dashboard title="Doctors Dashboard" mainListItems={mainListItems}>
            <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                        <Typography component="h1" variant="h4" color="primary">
                            Reviews of patients.
                        </Typography>
                        <Typography component="legend">Average Review</Typography>
                        <Rating name="read-only" value={averageReview} size="large" readOnly/>
                        <Paper className={classes.paperContent} elevation={5} >
                            { doctorReviews 
                                ? <ReviewTable columns={columns} rows={doctorReviews}/>
                                : <ReviewTable columns={columns} rows={rows}/>
                            }    
                        </Paper>
                    </Grid>
                </Grid>
            </Container>  
        </Dashboard>
    )
}

export default DoctorReviews;
