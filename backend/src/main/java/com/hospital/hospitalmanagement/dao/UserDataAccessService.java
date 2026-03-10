package com.hospital.hospitalmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.hospital.hospitalmanagement.models.LoginCredential;
import com.hospital.hospitalmanagement.models.User;

@Repository("userDao")
public class UserDataAccessService implements UserDao{
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	RowMapper<User> rowMapper = (rs, rowNum) ->{
        User user = new User(
                                                    rs.getString("email"),
                                                    rs.getString("password"),
                                                    rs.getString("role"));
        return  user;
    };

	@Override
	public User getUserByEmail(String email) {
		String query = "select * from user where email='"+email+"'";
        return jdbcTemplate.queryForObject(query, rowMapper);
	}

	@Override
	public int userExists(String email) {
		String query = "select count(*) from user where email='"+email+"'";
		int cnt = jdbcTemplate.queryForObject(query,Integer.class);
		if(cnt>0){
			String q = "select role from user where email='"+email+"'";
			String role = jdbcTemplate.queryForObject(q, String.class);

			String mypatient = "Patient";
			String mydoc = "Doctor";
			
			if(mypatient.compareTo(role)==0) return 1;
			else if(mydoc.compareTo(role)==0) return 2;
			else return 3;
			}
		else{
			return 0;
		}	
	}

	@Override
	public void saveUser(User user) {
        String query = "insert into user(email,password,role) values(?,?,?)";
        jdbcTemplate.update(query,user.getEmail(),user.getPassword(),user.getRole());
	}

	@Override
	public void addRole(String email, String role) {
        String query = "update user set role = '"+role+"' where email='"+email+"'";
        jdbcTemplate.update(query);
	}

	@Override
	public void removeUser(String email) {
		jdbcTemplate.update("DELETE from user where email = ?",email);
	}

	@Override
	public void updateEmail(String email) {
		jdbcTemplate.update("UPDATE user SET email = ? WHERE email = ?",email,email);
	}

	@Override
	public void updatePassword(String email, String password) {
		jdbcTemplate.update("UPDATE user SET password = ? WHERE email = ?",password,email);
	}

	@Override
	public boolean isvalidCredential(LoginCredential logs) {
		String query = "select count(*) from user where email = '"+logs.getEmail()+"' AND password = '"+logs.getPassword()+"'";
		int cnt = jdbcTemplate.queryForObject(query,Integer.class);
		if(cnt==0) return false;
		else return true;
	}

	@Override
	public List<User> getAllUser() {
		String q = "select * from user";
		return jdbcTemplate.query(q, rowMapper);
	}
}
