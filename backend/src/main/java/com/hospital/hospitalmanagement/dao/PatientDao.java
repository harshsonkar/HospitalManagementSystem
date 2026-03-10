package com.hospital.hospitalmanagement.dao;
import java.util.List;

import com.hospital.hospitalmanagement.models.Patient;

public interface PatientDao {
    public void add_patient(Patient pat);
    public Patient get_patient_by_email(String user_email);
    public void delete_patient(String user_email);
    public List<Patient> getAllPatient();
    public String getEmail(int id);
    public String getName(int id);
}
