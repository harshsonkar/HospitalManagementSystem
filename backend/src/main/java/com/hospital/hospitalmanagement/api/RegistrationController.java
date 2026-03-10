package com.hospital.hospitalmanagement.api;

import com.hospital.hospitalmanagement.models.Patient;
import com.hospital.hospitalmanagement.models.SignUpCredential;
import com.hospital.hospitalmanagement.models.User;
import com.hospital.hospitalmanagement.service.PatientService;
import com.hospital.hospitalmanagement.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/register")
@RestController
public class RegistrationController {
    private PatientService patientService;
    private UserService userService;
    

    @Autowired
    public RegistrationController(PatientService patientService, UserService userService) {
		this.patientService = patientService;
		this.userService = userService;
	}
    
//    @PostMapping
//    public void addAppointment(@RequestBody Appointment appointment){
//        appointmentService.addAppointment(appointment);
//    }
    @PostMapping
    public String register(@RequestBody SignUpCredential pat){
    	User user = new User(pat.getUser_email(),pat.getPassword(),"Patient");
    	Patient p = new Patient(pat.getUser_email(),pat.getF_name(),pat.getL_name(),pat.getSex(),pat.getPincode(),pat.getHouse_number(),pat.getCity(),pat.getState(),pat.getCountry(),pat.getDob(),pat.getPhone_no());
    	if(userService.userExists(pat.getUser_email()) != 0) {    		
    		return "user already exits";
    	};
    	//user.setEmail(pat.getUser_email());
    	//user.setPassword(pat.getPassword());
    	//user.setRole("Patient");
    	
    	//p.setAddress(pat.getAddress());
    	//p.setF_name(pat.getF_name());
    	//p.setL_name(pat.getL_name());
    	//p.setDob(pat.getDob());
    	//p.setSex(pat.getSex());
    	//p.setUser_email(pat.getUser_email());
    	
    	patientService.add_patient(p);
        userService.saveUser(user);
        return "registered";
    }


    @GetMapping(path = "/get_pat_by_email/{user_email}")
    public Patient get_patient_by_email(@PathVariable("user_email") String user_email){
        return patientService.get_patient_by_email(user_email);
    }


    @DeleteMapping(path="{user_email}")
    public void delete_patient(@PathVariable("user_email") String user_email){
        patientService.delete_patient(user_email);
    }
}