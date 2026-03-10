import React from 'react';
import {  Grid, Box } from '@mui/material';

import useStyles from './styles';
import Login2 from '../../components/userAuth/Login/Login2';
import Copyright from '../../components/Copyright/Copyright';
import { CssBaseline } from '@mui/material';

const Home = () => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                <Grid container component="main" className={classes.main}>
                    <Grid item xs={12}>
                        <Login2 />
                    </Grid>

                </Grid>

                <Box mt={6}>
                    <Copyright />
                </Box>       
            </div>

        </>
    )
}
export default Home;