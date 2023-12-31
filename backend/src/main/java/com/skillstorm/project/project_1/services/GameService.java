package com.skillstorm.project.project_1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project.project_1.models.Game;
import com.skillstorm.project.project_1.repositories.GameRepository;

@Service
public class GameService {

    @Autowired
    GameRepository gameRepository;

    public List<Game> findAllGames() {
        return gameRepository.findAllByOrderByTitleAsc();
    }

    // Checks to make sure the game exists before returning it
    public Game findGameById(int id) {
        Optional<Game> game = gameRepository.findById(id);

        if(game.isPresent()) {
            return game.get();
        }
        return null;
    }

    // Checks to make sure the game exists before returning it
    public List<Game> findGamesByTitle(String title) {
        List<Game> games = gameRepository.findAllByTitle(title);

        if(!games.isEmpty()) {
            return games;
        }
        return null;
    }

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }
    
    public void deleteGame(Game game) {
        int gameId = game.getId();
        gameRepository.deleteGame(gameId);
        gameRepository.resetGameSerial();           // Calls the repository query to reset the serial/game id
    }
   
}
