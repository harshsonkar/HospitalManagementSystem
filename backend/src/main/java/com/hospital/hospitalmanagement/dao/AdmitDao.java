package com.hospital.hospitalmanagement.dao;
import com.hospital.hospitalmanagement.models.Admit;
import java.util.List;

public interface AdmitDao {
    void add_admit(Admit pat);
    List<Admit> get_admit_by_email(String user_email);
    List<Admit> get_admit_by_doctor(int doctor);
    void discharge_admit(String user_email);
}