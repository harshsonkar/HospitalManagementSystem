package com.hospital.hospitalmanagement.api;

import com.hospital.hospitalmanagement.models.Appointment;
import com.hospital.hospitalmanagement.models.AppointmentEmail;
import com.hospital.hospitalmanagement.models.Prescription;
import com.hospital.hospitalmanagement.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
@CrossOrigin
@RequestMapping("/api/appointment")
@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

//    @PostMapping
//    public void addAppointment(@RequestBody Appointment appointment){
//        appointmentService.addAppointment(appointment);
//    }
    @PostMapping(path = "/addAppointment")
    public void appAppointment(@RequestBody AppointmentEmail appt){
        appointmentService.addAppointment(appt);
    }

    @GetMapping
    public  List<Appointment> getAllAppointments(){
        return appointmentService.getAllPatients();
    }
    @GetMapping(path = "/getApptByUserEmail/{user_email}")
    public List<Appointment> getAppointmentByUserEmail(@PathVariable("user_email") String user_email){
        return appointmentService.getAppointmentByUserEmail(user_email);
    }

    @GetMapping(path = "/getApptByDoctorEmail/{doctor_email}")
    public  List<Appointment> getAppointmentByDoctorEmail(@PathVariable("doctor_email") String doctorEmail){
        return appointmentService.getAppointmentByDoctorEmail(doctorEmail);
    }

    @DeleteMapping(path="/deleteAppointment/{doctor_email}/{user_email}/{date}/{time_slot}")
    public void deleteAppointment(@PathVariable("doctor_email") String doctor_email, @PathVariable("user_email") String user_email, @PathVariable Date date, @PathVariable("time_slot") String time_slot){
        appointmentService.deleteAppointment(doctor_email,user_email,date,time_slot);
    }

    @PostMapping(path = "/addPrescription")
    public void addPrescription(@RequestBody Prescription prescription){
        appointmentService.addPrescription(prescription);
    }

    @GetMapping(path = "/getPastAppointments/{pat_email}")
    public List<Appointment> getPastAppointments(@PathVariable("pat_email") String patEmail){
        return appointmentService.getPastAppointments(patEmail);
    }

    @GetMapping(path = "/getAvailableSlots/{doctor_email}/{date}")
    public List<String> getAvailableAppointments(@PathVariable("doctor_email") String doctor_email, @PathVariable("date") Date date){
        return appointmentService.getAvailableAppointments(doctor_email,date);
    }
}
