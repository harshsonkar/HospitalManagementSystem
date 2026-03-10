package com.hospital.hospitalmanagement.models;

public class ReviewEmail {
    private String doctor_email;
    private String pat_email;
    private String review;

    public ReviewEmail(String doctor_email, String pat_email, String review) {
        this.doctor_email = doctor_email;
        this.pat_email = pat_email;
        this.review = review;
    }

    public String getDoctor_email() {
        return doctor_email;
    }

    public String getPat_email() {
        return pat_email;
    }

    public String getReview() {
        return review;
    }
}
