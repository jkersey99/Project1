package com.skillstorm.project.project_1.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    public List<Game> findAllByTitle(String title);

    // native query to reset the serial sequence, that way deleting a game will allow the id to be reused and not increment forever. 
    // also helps with not having id gaps during front end fetches
    @Query(value="select setval(pg_get_serial_sequence('games', 'game_id'), coalesce (max(game_id)+1, 1), false) from games", nativeQuery = true)
    public long resetGameSerial();

    // find all so that the games are listed by title and not id
    public List<Game>findAllByOrderByTitleAsc();

    // native delete query. normal delete was not functioning, however this native one works
    @Query(value="delete from games where game_id = ?1", nativeQuery = true)
    @Modifying
    @Transactional
    public void deleteGame(@Param("game_id") int gameId);
    
}
