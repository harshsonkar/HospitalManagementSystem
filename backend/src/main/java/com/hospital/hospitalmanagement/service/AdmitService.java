package com.hospital.hospitalmanagement.service;

import com.hospital.hospitalmanagement.dao.AdmitDao;
import com.hospital.hospitalmanagement.models.Admit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class AdmitService {
    private final AdmitDao admitDao;

    @Autowired
    public AdmitService(@Qualifier("AdmDao") AdmitDao admitDao) {
        this.admitDao = admitDao;
    }

    public void add_admit(Admit pat){
        admitDao.add_admit(pat);
    }

    public List<Admit> get_admit_by_email(String user_email){
        return admitDao.get_admit_by_email(user_email);
    }

    public List<Admit> get_admit_by_doctor(int doctor){
        return admitDao.get_admit_by_doctor(doctor);
    }

    public void discharge_admit(String user_email){
        admitDao.discharge_admit(user_email);
    }
}