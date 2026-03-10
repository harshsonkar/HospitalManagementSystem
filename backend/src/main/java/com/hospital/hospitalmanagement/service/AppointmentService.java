package com.hospital.hospitalmanagement.service;

import com.hospital.hospitalmanagement.dao.AppointmentDao;
import com.hospital.hospitalmanagement.models.Appointment;
import com.hospital.hospitalmanagement.models.AppointmentEmail;
import com.hospital.hospitalmanagement.models.Prescription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentDao appointmentDao;

    @Autowired
    public AppointmentService(@Qualifier("apptDao") AppointmentDao appointmentDao) {
        this.appointmentDao = appointmentDao;
    }
//    public void addAppointment(Appointment appointment){
//        appointmentDao.addAppointment(appointment);
//    }

    public void addAppointment(AppointmentEmail appt){
        appointmentDao.addAppointment(appt);
    }

    public List<Appointment> getAppointmentByUserEmail(String userEmail){
        return appointmentDao.getAppointmentByUserEmail(userEmail);
    }

    public List<Appointment> getAppointmentByDoctorEmail(String doctorEmail){
        return appointmentDao.getAppointmentByDoctorEmail(doctorEmail);
    }

    public void deleteAppointment(String doctor_email, String user_email, Date date, String time_slot){
        appointmentDao.deleteAppointment(doctor_email,user_email,date,time_slot);
    }

    public void addPrescription(Prescription prescription){
        appointmentDao.addPrescription(prescription);
    }

    public List<Appointment> getAllPatients(){
        return appointmentDao.getAllAppointments();
    }

    public List<Appointment> getPastAppointments(String patEmail){
        return appointmentDao.getPastAppointments(patEmail);
    }

    public List<String> getAvailableAppointments(String doctor_email, Date date){
        return appointmentDao.getAvailableAppointments(doctor_email,date);
    }
}
