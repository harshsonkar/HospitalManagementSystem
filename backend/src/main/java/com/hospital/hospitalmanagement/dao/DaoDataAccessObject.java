package com.hospital.hospitalmanagement.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.hospital.hospitalmanagement.models.DetailDoctor;


@Repository("daorepo")
public class DaoDataAccessObject implements Dao {
	
	@Autowired
    JdbcTemplate jdbcTemplate;

	RowMapper<DetailDoctor> rowMapper = (rs, rowNum) ->{
		DetailDoctor detailDoctor = new DetailDoctor(
				rs.getInt("id"),
				rs.getString("firstname"),
				rs.getString("lastname"),
				rs.getString("email"),
				rs.getString("phoneNo"),
				rs.getString("city"),
				rs.getString("street"),
				rs.getString("pin"),
				rs.getDate("dob"),
				rs.getString("sex"),
				rs.getString("specialization")
                );
        return  detailDoctor;
    };
    
	@Override
	public List<DetailDoctor> fetchAllDoctor() {
        return jdbcTemplate.query("SELECT e.id,e.firstname,e.lastname,e.email,e.phoneNo,e.city,e.street,e.pin,e.dob,e.sex,d.specialization FROM doctor as d,employee as e where e.id=d.id",rowMapper, new Object[]{});
	}

	@Override
	public List<DetailDoctor> fetchDoctorDetails(String email) {
        return jdbcTemplate.query("SELECT e.id,e.firstname,e.lastname,e.email,e.phoneNo,e.city,e.street,e.pin,e.dob,e.sex,d.specialization FROM doctor as d,employee as e where e.id=d.id and e.email=?",rowMapper, new Object[]{email});
	}

	@Override
	public void createNewDoctor(int id, String firstName, String lastName, String email, String phoneNo, String city,
			String street, String pin, Date dob, String sex, String specialization) {
		jdbcTemplate.update("insert into employee values(?,'doctor',?,?,?,?,?,?,?,?,?)", id, firstName, lastName, email, phoneNo, city, street, pin, dob, sex);
		jdbcTemplate.update("insert into doctor values(?,?)", id, specialization);
		
	}

	@Override
	public void deleteDoctor(String email) {
		jdbcTemplate.update("delete from doctor where doctor.id=(select employee.id from employee where employee.email=?)", email);
		jdbcTemplate.update("delete from employee where employee.email=? ", email);
	}

	@Override
	public List<DetailDoctor> fetchDoctorBySpecialization(String specialization) {
        return jdbcTemplate.query("SELECT e.id,e.firstname,e.lastname,e.email,e.phoneNo,e.city,e.street,e.pin,e.dob,e.sex,d.specialization FROM doctor as d,employee as e where e.id=d.id and d.specialization=?",rowMapper, new Object[]{specialization});
	}

	@Override
	public DetailDoctor fetchDoctorById(int id) {
        return jdbcTemplate.queryForObject("SELECT e.id,e.firstname,e.lastname,e.email,e.phoneNo,e.city,e.street,e.pin,e.dob,e.sex,d.specialization FROM doctor as d,employee as e where e.id=d.id and d.id=?",rowMapper, id);
	}

	@Override
	public String getName(int id) {
		String q = "SELECT concat(firstName,' ',lastName) as name from employee where id = " + id;
		return jdbcTemplate.queryForObject(q,String.class);
	}
	@Override
	public String getEmail(int id) {
		String q = "SELECT email from employee where id = " + id;
		return jdbcTemplate.queryForObject(q,String.class);
	}
}
