package com.skillstorm.project.project_1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project.project_1.models.WarehouseInventory;
import com.skillstorm.project.project_1.services.WarehouseInventoryService;

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class WarehouseInventoryController {

    @Autowired
    WarehouseInventoryService warehouseInventoryService;

    @GetMapping("/warehouse")
    public ResponseEntity<List<WarehouseInventory>> findWarehouseInventory(@RequestParam("wareId") int wareId) {
        List<WarehouseInventory> inventory = warehouseInventoryService.findAllByWareId(wareId);
        return new ResponseEntity<List<WarehouseInventory>>(inventory, HttpStatus.OK);
    }

    @GetMapping("/game")
    public ResponseEntity<List<WarehouseInventory>> findGameInventory(@RequestParam("gameId") int gameId) {
        List<WarehouseInventory> inventory = warehouseInventoryService.findAllByGameId(gameId);
        return new ResponseEntity<List<WarehouseInventory>>(inventory, HttpStatus.OK);
    }
    
}
