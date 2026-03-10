package com.hospital.hospitalmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.hospital.hospitalmanagement.dao.UserDao;
import com.hospital.hospitalmanagement.models.LoginCredential;
import com.hospital.hospitalmanagement.models.User;

@Service
public class UserService {
	private UserDao userDao;
	
	@Autowired
	public UserService(@Qualifier("userDao")UserDao userDao) {
		this.userDao = userDao;
	}
	
	public User getUserByEmail(String email) {
		return userDao.getUserByEmail(email);
	};
	public int userExists(String email) {
		return userDao.userExists(email);
	};
	public void saveUser(User user) {
		userDao.saveUser(user);
	};
	public void addRole(String email, String role) {
		userDao.addRole(email, role);
	};
	public void removeUser(String email) {
		userDao.removeUser(email);
	};
	public void updateEmail(String email) {
		userDao.updateEmail(email);
	};
	public void updatePassword(String email, String password) {
		userDao.updatePassword(email, password);
	};
	public boolean isvalidCredential(LoginCredential logs) {
		return userDao.isvalidCredential(logs);
	}
	public List<User> getAllUser() {
		return userDao.getAllUser();
	}
}
