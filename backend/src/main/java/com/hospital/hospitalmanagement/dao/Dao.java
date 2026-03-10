package com.hospital.hospitalmanagement.dao;

import java.sql.Date;
import java.util.List;

import com.hospital.hospitalmanagement.models.DetailDoctor;

public interface Dao {
	public List <DetailDoctor> fetchAllDoctor();
	public List <DetailDoctor> fetchDoctorDetails(String email);
	public List <DetailDoctor> fetchDoctorBySpecialization(String specialization);
	public DetailDoctor fetchDoctorById(int id);
	public void createNewDoctor(int id, String firstName, String lastName, String email, String phoneNo, String city, String street,
			String pin, Date dob, String sex, String specialization);
	public void deleteDoctor(String email);
	public String getEmail(int id);
	public String getName(int id);
}
