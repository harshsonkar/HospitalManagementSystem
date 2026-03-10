package com.hospital.hospitalmanagement.models;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;


public class AppointmentEmail {
    private Date date;
    private String doctor_email;
    private String pat_email;
    private String time_slot;

    public Date getDate() {
        return date;
    }

    public String getDoctor_email() {
        return doctor_email;
    }

    public String getPat_email() {
        return pat_email;
    }

    public String getTime_slot() {
        return time_slot;
    }
}
