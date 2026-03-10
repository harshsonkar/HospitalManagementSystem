package com.hospital.hospitalmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.hospital.hospitalmanagement.dao.Dao;
import com.hospital.hospitalmanagement.models.DetailDoctor;

@Service
public class Services {
	private final Dao dao;
	
	@Autowired
    public Services(@Qualifier("daorepo") Dao dao) {
        this.dao = dao;
    }
	
	public List <DetailDoctor> fetchAllDoctor(){
		return dao.fetchAllDoctor();
	}
	public List <DetailDoctor> fetchDoctorDetails(String email){
		return dao.fetchDoctorDetails(email);
	}
	public void createNewDoctor(DetailDoctor D) {
		dao.createNewDoctor(D.getId(), D.getFirstName(), D.getLastName(), D.getEmail(), D.getPhoneNo(), D.getCity(), D.getStreet(), D.getPin(), D.getDob(), D.getSex(), D.getSpecialization());
		return;
	}

	public void deleteDoctor(String email) {
		dao.deleteDoctor(email);
		return;
	}
	
	public List<DetailDoctor> fetchDoctorBySpecialization(String specialization) {
		return dao.fetchDoctorBySpecialization(specialization);
	}

	public DetailDoctor fetchDoctorById(int id) {
		return dao.fetchDoctorById(id);
	}
	
	public String getEmail(int id) {
		return dao.getEmail(id);
	}
	public String getName(int id) {
		return dao.getName(id);
	}
}
