package com.hospital.hospitalmanagement.models;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

//import java.util.Date;

public class Appointment {
    //private final int appt_id;
    private Date date;
    private int doctor_id;
    private int pat_id;

    private String time_slot;

    private String prescription;

    public String getPrescription() {
        return prescription;
    }

    public Appointment(Date date, int doctor_id, int pat_id, String time_slot) {

        this.date = date;
        this.doctor_id = doctor_id;
        this.pat_id = pat_id;
        this.time_slot=time_slot;
    }

    public Appointment(Date date, int doctor_id, int pat_id, String time_slot, String prescription) {
        this.date = date;
        this.doctor_id = doctor_id;
        this.pat_id = pat_id;
        this.time_slot = time_slot;
        this.prescription = prescription;
    }
    //    public int getAppt_id() {
//        return appt_id;
//    }

    public Date getDate() {
        return date;
    }

    public int getDoctor_id() {
        return doctor_id;
    }

    public int getPat_id() {
        return pat_id;
    }

    public String getTime_slot() {
        return time_slot;
    }
}
