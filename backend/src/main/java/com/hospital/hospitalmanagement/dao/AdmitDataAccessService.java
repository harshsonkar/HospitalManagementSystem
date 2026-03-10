package com.hospital.hospitalmanagement.dao;

import com.hospital.hospitalmanagement.models.Admit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("AdmDao")
public class AdmitDataAccessService implements AdmitDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<Admit> rowMapper = (rs, rowNum) ->{
        Admit admit = new Admit(
                rs.getString("user_email"),
                rs.getString("f_name"),
                rs.getString("l_name"),
                rs.getString("sex"),
                rs.getString("address"),
                rs.getDate("admit_date"),
                rs.getInt("doctor"),
                rs.getString("status"));

        return  admit;
    };


    @Override
    public void add_admit(Admit pat) {
        jdbcTemplate.update("Insert into admit(user_email, f_name, l_name, sex, address, admit_date, doctor, status) values(?,?,?,?,?,?,?,'Acitve')", pat.getUser_email(), pat.getF_name(), pat.getL_name(), pat.getSex(), pat.getAddress(), pat.getAdmitDate(), pat.getDoctor());

    }

    @Override
    public List<Admit> get_admit_by_email(String user_email) {
        return jdbcTemplate.query("SELECT * from admit where admit.user_email = ?",rowMapper, new Object[]{user_email});
    }

    @Override
    public List<Admit> get_admit_by_doctor(int doctor) {
        return jdbcTemplate.query("SELECT * from admit where admit.doctor = ?",rowMapper, new Object[]{doctor});
    }

    @Override
    public void discharge_admit(String user_email) {
        jdbcTemplate.update("UPDATE admit Set admit.status = 'Inactive' where admit.user_email = ?",user_email);
    }


}