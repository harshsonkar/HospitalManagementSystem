package com.hospital.hospitalmanagement.api;

import com.hospital.hospitalmanagement.models.Admit;
import com.hospital.hospitalmanagement.service.AdmitService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/admit")
@RestController
@CrossOrigin
public class AdmitController {

    private final AdmitService admitService;

    @Autowired
    public AdmitController(AdmitService admitService) {
        this.admitService = admitService;
    }

    @PostMapping()
    public void add_admit(@RequestBody Admit pat){
        admitService.add_admit(pat);
    }


    @GetMapping(path = "/get_adm_by_email/{user_email}")
    public List<Admit> get_admit_by_email(@PathVariable("user_email") String user_email){
        return admitService.get_admit_by_email(user_email);
    }
    
    @GetMapping(path = "/get_adm_by_doctor/{doctor}")
    public List<Admit> get_admit_by_doctor(@PathVariable("doctor") int doctor){
        return admitService.get_admit_by_doctor(doctor);
    }


    @DeleteMapping(path="del/{user_email}")
    public void discharge_admit(@PathVariable("user_email") String user_email){
        admitService.discharge_admit(user_email);
    }
}
