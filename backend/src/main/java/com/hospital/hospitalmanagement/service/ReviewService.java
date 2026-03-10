package com.hospital.hospitalmanagement.service;

import com.hospital.hospitalmanagement.dao.ReviewDao;
import com.hospital.hospitalmanagement.models.Review;
import com.hospital.hospitalmanagement.models.ReviewEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewDao reviewDao;

    @Autowired
    public ReviewService(@Qualifier("reviewDao") ReviewDao reviewDao) {
        this.reviewDao = reviewDao;
    }


    public void addReview(ReviewEmail rev){
        reviewDao.addReview(rev);
    }

    public List<Review> getDoctorReviews(String doctor_email){
        return reviewDao.getDoctorReviews(doctor_email);
    }
    public List<Review> getPatientReviews(String pat_email){
        return reviewDao.getPatientReviews(pat_email);
    }
    public double getDoctorAvgReview(String doctorEmail){
        return reviewDao.getDoctorAvgReview(doctorEmail);
    }
}
