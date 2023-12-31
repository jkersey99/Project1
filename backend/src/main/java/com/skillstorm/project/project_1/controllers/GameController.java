package com.skillstorm.project.project_1.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project.project_1.models.Game;
import com.skillstorm.project.project_1.services.GameService;

// Game Controller
@RestController
@RequestMapping("/games")
@CrossOrigin
public class GameController {

    @Autowired
    GameService gameService;

    @GetMapping
    public ResponseEntity<List<Game>> findAllGames() {
        List<Game> games = gameService.findAllGames();

        return new ResponseEntity<List<Game>>(games, HttpStatus.OK);
    }

    // Used to find games by their Id
    @GetMapping("/id/{id}")
    public ResponseEntity<Game> findGameById(@PathVariable int id) {
        Game game = gameService.findGameById(id);
        return new ResponseEntity<Game>(game, HttpStatus.OK);
    }

    // Used to find games by their title
    @GetMapping("/title")
    public ResponseEntity<List<Game>> findGamesByTitle(@RequestParam String title) {
        List<Game> games = gameService.findGamesByTitle(title);
        return new ResponseEntity<List<Game>>(games, HttpStatus.OK);
    }

    // Adds new games to the database
    @PostMapping
    public ResponseEntity<Game> createGame(@Valid @RequestBody Game game) {
        
        Game createdGame = gameService.saveGame(game);
        return new ResponseEntity<Game>(createdGame, HttpStatus.CREATED);
    }

    // Updates games in the database
    @PutMapping("/game")
    public ResponseEntity<Game> updateGame(@RequestBody Game game) {
        Game updatedGame = gameService.saveGame(game);
        return new ResponseEntity<Game>(updatedGame, HttpStatus.OK);
    }
    
    // Deletes games in the database
    @DeleteMapping("/delete")
    public ResponseEntity<Game> deleteGame(@RequestBody Game game) {
        gameService.deleteGame(game);
        return ResponseEntity.noContent().build();
    }
}
