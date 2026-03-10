package com.hospital.hospitalmanagement.models;

public class Review {
    private int doctor_id;
    private int pat_id;
    private int review;

    public Review(int doctor_id, int pat_id, int review) {
        this.doctor_id = doctor_id;
        this.pat_id = pat_id;
        this.review = review;
    }

    public int getDoctor_id() {
        return doctor_id;
    }

    public int getPat_id() {
        return pat_id;
    }

    public int getReview() {
        return review;
    }
}
