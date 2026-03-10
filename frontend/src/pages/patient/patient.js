import React from 'react';
import { BrowserRouter as Router, Switch, Route,Routes, useLocation, Outlet } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import PatientDashboard from './PatientDashboard';
// import PatientAppointments from './PatientAppointments';
import { mainListItems } from './PatientListItems';
// import PatientAppointmentHistory from './PatientAppointmentHistory';
// import PatientPrescriptions from './PatientPrescriptions';
import { NotFound } from '..';

const Patient = () => {
    
    return (
    <Dashboard title="Patient Dashboard" mainListItems={mainListItems}>
        <PatientDashboard />
    </Dashboard>)
}

export default Patient;