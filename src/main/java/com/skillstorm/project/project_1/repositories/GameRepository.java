package com.skillstorm.project.project_1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    public List<Game> findAllByTitle(String title);
    
    
}
