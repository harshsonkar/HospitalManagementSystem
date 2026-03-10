package com.hospital.hospitalmanagement.models;

import java.sql.Date;



public class Patient {
    //private int pat_id;
    
    private String user_email;
    private String f_name;
    private String l_name;
    private String sex;
    private String pincode;
    private String house_number;
    private String city;
    private String state;
    private String country;
    private Date dob;
    private String phone_no;
    
    public Patient() {
    	
    }
    
	public Patient(String user_email, String f_name, String l_name, String sex, String pincode, String house_number,
			String city, String state, String country, Date dob, String phoneNo) {
		this.user_email = user_email;
		this.f_name = f_name;
		this.l_name = l_name;
		this.sex = sex;
		this.pincode = pincode;
		this.house_number = house_number;
		this.city = city;
		this.state = state;
		this.country = country;
		this.dob = dob;
		this.phone_no = phoneNo;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public String getF_name() {
		return f_name;
	}

	public void setF_name(String f_name) {
		this.f_name = f_name;
	}

	public String getL_name() {
		return l_name;
	}

	public void setL_name(String l_name) {
		this.l_name = l_name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getHouse_number() {
		return house_number;
	}

	public void setHouse_number(String house_number) {
		this.house_number = house_number;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}
	
}
