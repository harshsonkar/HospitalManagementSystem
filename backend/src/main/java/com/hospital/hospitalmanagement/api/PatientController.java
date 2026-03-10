package com.hospital.hospitalmanagement.api;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospitalmanagement.models.Patient;
import com.hospital.hospitalmanagement.service.PatientService;
@CrossOrigin
@RequestMapping("/api/patient")
@RestController
public class PatientController {
	private PatientService patientService;

	@Autowired
	public PatientController(PatientService patientService) {
		this.patientService = patientService;
	}
	
	@PostMapping("/save") 
	public void savePatient(@RequestBody Patient pat) {
		patientService.add_patient(pat);
	}	
	
	@GetMapping(path = "/get/{email}")
	public Patient getPatient(@PathVariable("email") String email) {
		return patientService.get_patient_by_email(email);
	}
	
	@GetMapping(path = "/getemail/{id}")
	public String getEmail(@PathVariable("id") int id) {
		return patientService.getEmail(id);
	}
	
	@GetMapping(path = "/getname/{id}")
	public String getName(@PathVariable("id") int id) {
		return patientService.getName(id);
	}
	
	@GetMapping(path = "/getall") 
	public List<Patient> getAllPatient() {
		return patientService.getAllPatient();
	}
	
	@DeleteMapping(path = "/delete/{email}")
	public void deletePatient(@PathVariable("email") String email) {
		patientService.delete_patient(email);
	}
}
