package com.skillstorm.project.project_1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer>{

    public City findByCity(String city);

    //  not used
    
}
