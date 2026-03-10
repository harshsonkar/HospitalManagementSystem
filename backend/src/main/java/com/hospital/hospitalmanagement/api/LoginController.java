package com.hospital.hospitalmanagement.api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospitalmanagement.models.LoginCredential;
import com.hospital.hospitalmanagement.service.UserService;
@CrossOrigin
@RequestMapping("/api/login")
@RestController
public class LoginController {
	private UserService userService;
	
	@Autowired
	public LoginController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping
	public int checkLogin(@RequestBody LoginCredential log) {
		if(userService.isvalidCredential(log)) {
			return userService.userExists(log.getEmail());
		}
		return 0;
	}

}
