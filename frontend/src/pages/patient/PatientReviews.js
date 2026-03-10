import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { useDB } from '../../contexts/dbstate';
import Dashboard from '../../components/dashboard/dashboard';
import { mainListItems } from './PatientListItems';
import  PatientReviewTable from './PatientReviewTable'
function createData(name, email,review) {
    return { name,email,review};
}

const rows = [
    createData('utkarsh rai', 'utkarsh.rai.cse20@itbhu.ac.in', '1'),
    createData('utkarsh rai', 'utkarsh.rai.cse20@itbhu.ac.in', '0'),
    createData('utkarsh rai', 'utkarsh.rai.cse20@itbhu.ac.in', '1'),
];

const columns = [
    { id: 'name', label: 'Doctor Name', minWidth: 150 },
    { id: 'email', label: 'email', minWidth: 170 },
    { id: 'review', label: 'Current Rating', minWidth: 170 },
];


const PatientReview = () => {
    const  classes = useStyles();

    const { userReviews } = useDB();

    return (
        <Dashboard title="Patient Dashboard" mainListItems={mainListItems}>
            <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography component="h1" variant="h4" color="primary">
                            Rate Your Doctor
                        </Typography>
                        <Paper className={classes.paperContent} elevation={5}>
                            {userReviews.length!==0 
                                ? <PatientReviewTable columns={columns} rows={userReviews}/>
                                : <PatientReviewTable columns={columns} rows={rows}/>
                            }    
                        </Paper>
                    </Grid>
                </Grid>
            </Container>  
        </Dashboard>
    )
}

export default PatientReview;