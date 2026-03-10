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

import com.hospital.hospitalmanagement.models.DetailDoctor;
import com.hospital.hospitalmanagement.service.Services;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin
@RequestMapping("/api/doctor")
@RestController
public class controller {
	private final Services services;
	
	@Autowired
    public controller(Services services) {
        this.services = services;
    }
	
	@GetMapping(path = "/fetchDoctor")
    public List<DetailDoctor> fetchAllDoctor(){
        return services.fetchAllDoctor();
    }

    @GetMapping(path = "/fetchDoctorByEmail/{doctor_email}")
    public  List<DetailDoctor> fetchDoctorDetails(@PathVariable("doctor_email") String email){
        return services.fetchDoctorDetails(email);
    }
    
    @GetMapping(path = "/getemail/{id}")
    public String getEmail(@PathVariable("id") int id) {
    	return services.getEmail(id);
    }
    @GetMapping(path = "/getname/{id}")
    public String getName(@PathVariable("id") int id) {
    	return services.getName(id);
    }
    
    @GetMapping(path = "/fetchDoctorBySpec/{specialization}")
    public List<DetailDoctor> fetchDoctorBySpecialization(@PathVariable("specialization") String specialization) {
    	return services.fetchDoctorBySpecialization(specialization);
    }
    
    @GetMapping(path = "/fetchDoctorById/{id}")
    public DetailDoctor fetchDoctorById(@PathVariable("id") int id) {
    	return services.fetchDoctorById(id);
    }
    
    @PostMapping(path = "/createDoctor")
    public void createNewDoctor(@RequestBody DetailDoctor detailDoctor){
		services.createNewDoctor(detailDoctor);
	}

    @DeleteMapping(path = "/deleteDoctor/{email}")
	public void deleteDoctor(@PathVariable("email") String email) {
		services.deleteDoctor(email);
	}
    
}
