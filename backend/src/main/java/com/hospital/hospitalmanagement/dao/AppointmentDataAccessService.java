package com.hospital.hospitalmanagement.dao;

import com.hospital.hospitalmanagement.models.Appointment;
import com.hospital.hospitalmanagement.models.AppointmentEmail;
import com.hospital.hospitalmanagement.models.Prescription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Repository("apptDao")
public class AppointmentDataAccessService implements AppointmentDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<Appointment> rowMapper = (rs, rowNum) ->{
        Appointment appointment = new Appointment(
                                                    rs.getDate("appt_date"),
                                                    rs.getInt("doctor_id"),
                                                    rs.getInt("pat_id"),
                                                    rs.getString("time_slot"));
        return  appointment;
    };

    RowMapper<Appointment> rowMapperPrescription = (rs, rowNum) ->{
        Appointment appointment = new Appointment(
                rs.getDate("appt_date"),
                rs.getInt("doctor_id"),
                rs.getInt("pat_id"),
                rs.getString("time_slot"),
                rs.getString("prescription"));
        return  appointment;
    };


    List<String> Slots = Arrays.asList(
            "9:00AM-9:30AM",
            "9:30AM-10:00AM",
            "10:00AM-10:30AM",
            "10:30AM-11:00AM",
            "11:00AM-11:30AM",
            "11:30AM-12:00PM",
            "12:00PM-12:30PM",
            "12:30PM-01:00PM",
            "01:00PM-01:30PM",
            "01:30PM-02:00PM",
            "02:00PM-02:30PM",
            "02:30PM-03:00PM",
            "03:00PM-03:30PM",
            "03:30PM-04:00PM",
            "04:00PM-04:30PM",
            "04:30PM-05:00PM"
    );

//    @Override
//    public void addAppointment(Appointment appointment) {
//        String sql = "INSERT INTO appointments(appt_date,doctor_id,pat_id,time_slot) VALUES (?,?,?,?)";
//        jdbcTemplate.update(sql,appointment.getDate(), appointment.getDoctor_id(),appointment.getPat_id(),appointment.getTime_slot());
//    }


    @Override
    public void addAppointment(AppointmentEmail appt) {
        String sql="INSERT INTO appointments(doctor_id,pat_id,appt_date, time_slot) SELECT e.id, p.pat_id, ?, ? FROM employee e, patients p  WHERE e.email=? AND p.user_email=?";
        jdbcTemplate.update(sql,appt.getDate(),appt.getTime_slot(),appt.getDoctor_email(),appt.getPat_email());
    }

    @Override
    public List<Appointment> getAppointmentByPatId(int id) {
        return jdbcTemplate.query("SELECT * FROM appointments WHERE pat_id=?",rowMapperPrescription, new Object[]{id});
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return jdbcTemplate.query("SELECT * FROM appointments", rowMapperPrescription, new Object[]{});
        //return null;
    }

    @Override
    public List<Appointment> getAppointmentByUserEmail(String userEmail) {

        return jdbcTemplate.query("SELECT * FROM appointments WHERE pat_id=(SELECT pat_id FROM patients WHERE user_email=?)",rowMapperPrescription, new Object[]{userEmail});
        //return null;
    }

    @Override
    public List<Appointment> getAppointmentByDoctorEmail(String doctorEmail) {
        return jdbcTemplate.query("SELECT * FROM appointments WHERE doctor_id=(SELECT id FROM employee WHERE email=?)",rowMapperPrescription, new Object[]{doctorEmail});
    }

    @Override
    public List<Appointment> getPastAppointments(String patEmail) {
        return jdbcTemplate.query("SELECT * FROM appointments WHERE pat_id=(SELECT pat_id FROM patients WHERE user_email=?) AND appt_date < CURDATE()", rowMapperPrescription, new Object[] {patEmail});
    }

    @Override
    public void deleteAppointment(String doctor_email, String user_email, Date date, String time_slot) {
        jdbcTemplate.update("DELETE FROM appointments WHERE doctor_id=(SELECT id FROM employee WHERE email=?) AND time_slot=? AND appt_date=? AND pat_id=(SELECT pat_id FROM patients WHERE user_email=?)", doctor_email,time_slot,date,user_email);
    }

    @Override
    public void addPrescription(Prescription prescription) {
        String sql="UPDATE appointments SET prescription=? WHERE doctor_id=(SELECT id FROM employee WHERE email=?) AND time_slot=? AND appt_date=? AND pat_id=(SELECT pat_id FROM patients WHERE user_email=?)";
        System.out.println(prescription.getPrescription());
        System.out.println(prescription.getDoctor_email());
        System.out.println(prescription.getTime_slot());
        System.out.println(prescription.getDate());
        System.out.println(prescription.getPat_email());
        jdbcTemplate.update(sql,prescription.getPrescription(),prescription.getDoctor_email(),prescription.getTime_slot(),prescription.getDate(),prescription.getPat_email());
    }

    @Override
    public List<String> getAvailableAppointments(String doctor_email, Date date) {
        List<Appointment> booked =jdbcTemplate.query("SELECT * FROM appointments WHERE doctor_id=(SELECT id from employee WHERE email=?) AND appt_date=?", rowMapperPrescription, new Object[] {doctor_email, date});
        List<String> available = new ArrayList<>();
        for(String slot:Slots){
            Boolean  flag=true;
            for(Appointment appt:booked){
                if(appt.getTime_slot().compareTo(slot) == 0){
                    flag=false;
                    break;
                }
            }
            if(flag){
                available.add(slot);
            }
        }

        return available;
    }


}

