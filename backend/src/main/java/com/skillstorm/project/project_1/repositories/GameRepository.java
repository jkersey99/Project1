package com.skillstorm.project.project_1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    public List<Game> findAllByTitle(String title);

    @Query(value="select setval(pg_get_serial_sequence('games', 'game_id'), coalesce (max(game_id)+1, 1), false) from games", nativeQuery = true)
    public long resetGameSerial();

    public List<Game>findAllByOrderByTitleAsc();
    
}
