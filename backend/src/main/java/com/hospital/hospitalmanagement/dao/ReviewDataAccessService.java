package com.hospital.hospitalmanagement.dao;

import com.hospital.hospitalmanagement.models.Review;
import com.hospital.hospitalmanagement.models.ReviewEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("reviewDao")
public class ReviewDataAccessService implements  ReviewDao{
    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<Review> rowMapper = (rs,rowNum)->{
      Review review = new Review(
                                    rs.getInt("doctor_id"),
                                    rs.getInt("pat_id"),
                                    rs.getInt("review")
                                );
      return review;
    };


    @Override
    public void addReview(ReviewEmail rev) {
    	String q = "UPDATE reviews SET review = ? WHERE reviews.doctor_id IN (SELECT e.id from employee as e where e.email = ?) AND reviews.pat_id IN (SELECT p.pat_id from patients as p where p.user_email = ?)";
        jdbcTemplate.update(q, rev.getReview(),rev.getDoctor_email(),rev.getPat_email());
    }

    @Override
    public List<Review> getDoctorReviews(String doctorEmail) {
        return jdbcTemplate.query("SELECT * FROM reviews WHERE doctor_id = (SELECT id FROM employee WHERE email=?)", rowMapper, new Object[]{doctorEmail});
    }

    @Override
    public List<Review> getPatientReviews(String patEmail) {
        return jdbcTemplate.query("SELECT * FROM reviews WHERE pat_id = (SELECT pat_id FROM patients WHERE user_email=?)", rowMapper, new Object[] {patEmail});
    }

    @Override
    public double getDoctorAvgReview(String doctorEmail) {
        try{
            return jdbcTemplate.queryForObject("SELECT AVG(review) as avg_review FROM reviews WHERE doctor_id = (SELECT id FROM employee WHERE email= '"+doctorEmail+"')",double.class);
        }
        catch (NullPointerException ex){
            return 5;
        }
    }


}
