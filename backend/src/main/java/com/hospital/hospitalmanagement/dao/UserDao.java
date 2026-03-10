package com.hospital.hospitalmanagement.dao;

import java.util.List;

import com.hospital.hospitalmanagement.models.LoginCredential;
import com.hospital.hospitalmanagement.models.User;

public interface UserDao {
	public User getUserByEmail(String email);
	public int userExists(String email);
	public boolean isvalidCredential(LoginCredential logs);
	public void saveUser(User user);
	public void addRole(String email, String role);
	public void removeUser(String email);
	public void updateEmail(String email);
	public void updatePassword(String email, String password);
	public List<User> getAllUser();
}
