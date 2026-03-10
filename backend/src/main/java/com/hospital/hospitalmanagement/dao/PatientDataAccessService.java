package com.hospital.hospitalmanagement.dao;

import com.hospital.hospitalmanagement.models.Patient;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


@Repository("PatDao")
public class PatientDataAccessService implements PatientDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<Patient> rowMapper = (rs, rowNum) ->{
        Patient patient = new Patient(
                                                    rs.getString("user_email"),
                                                    rs.getString("f_name"),
                                                    rs.getString("l_name"),
                                                    rs.getString("sex"),
                                                    rs.getString("pincode"),
                                                    rs.getString("house_number"),
                                                    rs.getString("city"),
                                                    rs.getString("state"),
                                                    rs.getString("country"),
                                                    rs.getDate("dob"),
                                                    rs.getString("phone_no"));


        return  patient;
    };

    @Override
    public Patient get_patient_by_email(String user_email) {
        return jdbcTemplate.queryForObject("SELECT * from patients where patients.user_email = '"+user_email+"'",rowMapper);
    }

    @Override
    public void delete_patient(String user_email) {
        jdbcTemplate.update("DELETE FROM patients WHERE user_email = ?",user_email);
    }

	@Override
	public void add_patient(Patient pat) {
		String query = "insert into patients(user_email, f_name, l_name, sex, pincode, house_number, city, state, country, dob, phone_no) values(?,?,?,?,?,?,?,?,?,?,?)";
		jdbcTemplate.update(query,pat.getUser_email(),pat.getF_name(),pat.getL_name(),pat.getSex(),pat.getPincode(),pat.getHouse_number(),pat.getCity(),pat.getState(),pat.getCountry(),pat.getDob(),pat.getPhone_no());
	}

	@Override
	public List<Patient> getAllPatient() {
		return jdbcTemplate.query("SELECT * FROM patients",rowMapper);
	}

	@Override
	public String getEmail(int id) {
		String q = "SELECT user_email from patients where pat_id = " + id;
		return jdbcTemplate.queryForObject(q,String.class);
	}

	@Override
	public String getName(int id) {
		String q = "SELECT concat(f_name,' ',l_name) from patients where pat_id = " + id;
		return jdbcTemplate.queryForObject(q,String.class);
	}

}
