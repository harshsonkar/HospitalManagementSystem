package com.hospital.hospitalmanagement.dao;

import com.hospital.hospitalmanagement.models.Appointment;
import com.hospital.hospitalmanagement.models.AppointmentEmail;
import com.hospital.hospitalmanagement.models.Prescription;

import java.util.Date;
import java.util.List;

public interface AppointmentDao {
    //void addAppointment(Appointment appointment);
    void addAppointment(AppointmentEmail appt);
    List<Appointment> getAppointmentByPatId(int id);

    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentByUserEmail(String userEmail);

    List<Appointment> getAppointmentByDoctorEmail(String doctorEmail);

    List<Appointment> getPastAppointments(String patEmail);

    void deleteAppointment(String doctor_email, String user_email, Date date, String time_slot);

    void addPrescription(Prescription prescription);

    List<String> getAvailableAppointments(String doctor_email, Date date);
}
