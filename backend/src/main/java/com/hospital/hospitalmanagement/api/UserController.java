package com.hospital.hospitalmanagement.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospitalmanagement.models.LoginCredential;
import com.hospital.hospitalmanagement.models.User;
import com.hospital.hospitalmanagement.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
@RequestMapping("/api/user")
@RestController
@CrossOrigin
public class UserController {
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/register")
	public void saveUser(@RequestBody User user) {
		userService.saveUser(user);
	};
	
	@GetMapping(path = "/getUserByEmail/{email}")
	public User getUser(@PathVariable("email") String email ) {
		return userService.getUserByEmail(email);
	}
	
	@DeleteMapping(path = "remove/{email}")
	public void deleteUser(@PathVariable("email") String email) {
		userService.removeUser(email);
	}
	@PostMapping("/updatepass")
	public void updatePass(@RequestBody LoginCredential log) {
		userService.updatePassword(log.getEmail(), log.getPassword());
	}
	@GetMapping(path = "/getall")
	public List<User> getAllUser() {
		return userService.getAllUser();
	}
}
