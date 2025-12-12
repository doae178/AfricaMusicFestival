package com.mcommerce.eventservice.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "venue")
    private String venue;

    @Column(name = "opening_acts")
    private String openingActs;

    @Column(name = "attendance_raw")
    private String attendanceRaw;

    @Column(name = "revenue_raw")
    private String revenueRaw;

    @Column(name = "tour")
    private String tour;
}

