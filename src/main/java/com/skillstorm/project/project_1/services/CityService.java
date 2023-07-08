package com.skillstorm.project.project_1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project.project_1.models.City;
import com.skillstorm.project.project_1.repositories.CityRepository;

@Service
public class CityService {
        @Autowired
        CityRepository repository;

        public City savedCity(City city) {
            return repository.save(city);
        }

        public City getCity(String city) {
            return repository.findByCity(city);
        }
    
}
