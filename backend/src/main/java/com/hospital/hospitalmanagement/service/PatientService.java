package com.hospital.hospitalmanagement.service;

import com.hospital.hospitalmanagement.dao.PatientDao;
import com.hospital.hospitalmanagement.models.Patient;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


@Service
public class PatientService {
    private final PatientDao patientDao;

    @Autowired
    public PatientService(@Qualifier("PatDao") PatientDao patientDao) {
        this.patientDao = patientDao;
    }

    public void add_patient(Patient pat){
        patientDao.add_patient(pat);
    }

    public Patient get_patient_by_email(String user_email){
        return patientDao.get_patient_by_email(user_email);
    }

    public void delete_patient(String user_email){
        patientDao.delete_patient(user_email);
    }
    
    public List<Patient> getAllPatient() {
    	return patientDao.getAllPatient();
    }
    
    public String getEmail(int id) {
    	return patientDao.getEmail(id);
    }
    
    public String getName(int id) {
    	return patientDao.getName(id);
    }
}
