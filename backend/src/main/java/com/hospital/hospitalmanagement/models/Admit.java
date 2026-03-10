package com.hospital.hospitalmanagement.models;

import java.sql.Date;


public class Admit {

    private String user_email;
    private String f_name;
    private String l_name;
    private String sex;
    private String address;
    private Date admit_date;
    private int doctor;
    private String status;

    public Admit(String user_email, String f_name, String l_name, String sex, String address, Date admit_date, int doctor, String status) {
        this.user_email = user_email;
        this.f_name = f_name;
        this.l_name = l_name;
        this.sex = sex;
        this.address = address;
        this.admit_date = admit_date;
        this.doctor = doctor;
        this.status = status;
    }
//
//    public int getPat_id() {
//        return pat_id;
//    }

    public String getUser_email() {
        return user_email;
    }

    public String getF_name() {
        return f_name;
    }

    public String getL_name(){
        return l_name;
    }

    public String getAdmitName(){
        return f_name + " " + l_name;
    }

    public String getSex(){
        return sex;
    }


    public String getAddress(){
        return address;
    }

    public int getDoctor(){
        return doctor;
    }

    public String getStatus(){
        return status;
    }
    
    public Date getAdmitDate() {
    	return admit_date;
    }
}
