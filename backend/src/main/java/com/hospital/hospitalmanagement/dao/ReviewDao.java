package com.hospital.hospitalmanagement.dao;

import com.hospital.hospitalmanagement.models.Review;
import com.hospital.hospitalmanagement.models.ReviewEmail;

import java.util.List;

public interface ReviewDao {
    public void addReview(ReviewEmail rev);
    public List<Review> getDoctorReviews(String doctorEmail);
    public List<Review> getPatientReviews(String patEmail);

    public double getDoctorAvgReview(String doctorEmail);

}
