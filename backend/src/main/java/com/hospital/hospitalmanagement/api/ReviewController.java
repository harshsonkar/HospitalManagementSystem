package com.hospital.hospitalmanagement.api;


import com.hospital.hospitalmanagement.models.Review;
import com.hospital.hospitalmanagement.models.ReviewEmail;
import com.hospital.hospitalmanagement.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RequestMapping("/api/review")
@RestController
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public void addReview(@RequestBody ReviewEmail rev){
        reviewService.addReview(rev);
    }

    @GetMapping(path = "/getDoctorReviews/{doctor_email}")
    public List<Review> getDoctorReviews(@PathVariable("doctor_email") String doctor_email){
        return reviewService.getDoctorReviews(doctor_email);
    }

    @GetMapping(path = "/getPatientReviews/{pat_email}")
    public List<Review> getPatientReviews(@PathVariable("pat_email") String pat_email){
        return reviewService.getPatientReviews(pat_email);
    }

    @GetMapping(path = "/getDoctorAvgReview/{doctor_email}")
    public double getDoctorAvgReview(@PathVariable("doctor_email") String doctorEmail){
        return reviewService.getDoctorAvgReview(doctorEmail);
    }

}
