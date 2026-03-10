import React, { useState } from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import useStyles from './styles'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DatePickerField } from '../../components';
import { useDB } from '../../contexts/dbstate';
import { useAuth } from '../../contexts/authcontext';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


//? Convert Date to YYYY-MM-DD
function convertToDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
}

const PatientForm = () => {
    const classes = useStyles();
    const { currentDoctor,setCurrentDoctor,allDoctors, createNewAppointment,availableSlot,fetchAvailableSlot,setCurrentDate} = useDB();
    console.log(allDoctors);
    const { currentUser } = useAuth();
    const x=new Date();
    const initialValues = {
        specialization: '',
        doctor: '',
        appointmentDate: x
    }

    const [room, setRoom] = useState(0);
    const [doctorID, setDoctorID] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const status = 'active';
    const [message, setMessage] = useState('');

    const validationSchema = Yup.object().shape({
        specialization: Yup.string().required("Please select a specialization"),
        doctor: Yup.string().required("Please select a doctor"),
        appointmentDate: Yup.date().required('Please choose a date'),
        slot_number:Yup.string().required('each slot number have is of half hour')   
    })
    // console.log(fetchAllDoctors().then((val)=>{console.log(val)}));
    const handleSubmit = (values, props) => {
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 2000);
        
        try {
            setError('');
            setLoading(true);
            console.log(values);
            const currentEmail='';
            for( const x in allDoctors){
                if(x.name===values.doctor){
                    currentEmail=x.email;
                    break;
                }
            }
            createNewAppointment(currentDoctor,currentUser.email,values.appointmentDate,values.slot_number);
            setMessage('Appointment successfuly booked.');       
        } catch (error) {
            setError('Failed to create Doctor Account.');
        }
        
        setLoading(false);
    }
    
    return (
            
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form className={classes.root}>
                        <Grid container className={classes.container}>

                            {error && <Alert severity="error" sx={{ my: 1, width:'100%' }} >{error}</Alert>}

                            {message && <Alert severity="success" sx={{ my: 1, width:'100%' }} >{message}</Alert>}

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    label="Specialization"
                                    name="specialization"
                                    id="specialization"
                                    select
                                    fullWidth
                                    helperText={<ErrorMessage name="specialization"/>}
                                >

                                    {allDoctors.map((option) => (
                                        <MenuItem key={option.uid} value={option.specialization}>
                                            {option.specialization}
                                        </MenuItem>
                                    ))}

                                </Field>

                                <Field 
                                    as={TextField}
                                    variant="outlined"
                                    label="Doctor"
                                    name="doctor"
                                    id="doctor"
                                    select
                                    fullWidth
                                    helperText={<ErrorMessage name="doctor"/>}
                                    onChange={(e)=>{props.setFieldValue("doctor",e.target.value);
                                    let currentEmail='';
                                    console.log(props);
                                    console.log(allDoctors.length);
                                    for(let x=0;x<allDoctors.length;x++){
                                        console.log(allDoctors[x]);
                                        if(allDoctors[x].name===e.target.value){
                                           setCurrentDoctor(allDoctors[x].email);  
                                           setCurrentDate(props.values.appointmentDate)
                                        }
                                        console.log(currentEmail);
                                        // console.log(props);
                                    }
                                    }}
                                >
                                    
                                    {allDoctors.reduce((acc, cur) => {
                                            if(cur.specialization === props.values.specialization){
                                                let newDoctor = { 
                                                    name: cur.name, 
                                                    email:cur.email,
                                                    specialization: cur.specialization,
                                                    description:cur.description,
                                                    phone_no:cur.phone_no,
                                                    room:cur.room
                                                }
                                                acc.push(newDoctor)
                                            } 
                                            return acc
                                        },[]).map((option) => (
                                        <MenuItem key={option.email} value={option.name}>
                                        {option.name}
                                        </MenuItem>
                                    ))}
                                    
                                    {/* {doctors.reduce((acc, cur) => {
                                            if(cur.specialization === props.values.specialization){
                                                acc.push(cur.name)
                                            } 
                                            return acc
                                        },[]).map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))} */}

                                </Field>
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Field 
                                    component={DatePickerField}
                                    name="appointmentDate" 
                                    id="appointmentDate"
                                    variant="outlined"
                                    inputVariant="outlined"
                                    // onChange={()=>{console.log(convertToDate(props.values.appointmentDate));setCurrentDoctor({email:props.values.doctor.email,date:props.values.appointmentDate})}}
                                />
                                <Field
                                    as={TextField} 
                                    variant="outlined" 
                                    label="Slot Number"
                                    name= "slot_number"
                                    id="slot_number"
                                    select
                                    fullWidth
                                    helperText={<ErrorMessage name="slot_number"/>}
                                    color="secondary"
                                >
                                {
                                    availableSlot.map((option)=>(
                                        // console.log(typeof(option));
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))
                                }
                                </Field>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    size="large"
                                    disabled={loading}
                                    sx={{ m: 2 }}
                                >
                                    {
                                        loading ? "Loading..." : "Book Appointment"
                                    }
                                </Button>
                            </Grid>
                        </Grid> 
                    </Form>
                )}
        </Formik>
    )
}

export default PatientForm
