import React from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import DoctorDashboard from './DoctorDashboard';
import { mainListItems } from './DoctorListItems';


const Doctor = () => {
    return (

                        <Dashboard title="Doctors Dashboard" mainListItems={mainListItems} >
                                <DoctorDashboard />
                        </Dashboard>
    )
}

export default Doctor
