package com.mcommerce.eventservice.repository;



import com.mcommerce.eventservice.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
