package com.skillstorm.project.project_1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.project.project_1.models.Warehouse;
import com.skillstorm.project.project_1.models.WarehouseInventory;
import com.skillstorm.project.project_1.services.WarehouseInventoryService;

// Controller for the junction table
@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class WarehouseInventoryController {

    @Autowired
    WarehouseInventoryService warehouseInventoryService;

    // Find inventory by warehouse
    @GetMapping("/warehouseinv")
    public ResponseEntity<List<WarehouseInventory>> findWarehouseInventory(@RequestParam("wareId") int wareId) {
        List<WarehouseInventory> inventory = warehouseInventoryService.findAllByWareId(wareId);
        return new ResponseEntity<List<WarehouseInventory>>(inventory, HttpStatus.OK);
    }

    // Finds inventory by game
    @GetMapping("/gameinv")
    public ResponseEntity<List<WarehouseInventory>> findGameInventory(@RequestParam("gameId") int gameId) {
        List<WarehouseInventory> inventory = warehouseInventoryService.findAllByGameId(gameId);
        return new ResponseEntity<List<WarehouseInventory>>(inventory, HttpStatus.OK);
    }

    // Adds new warehouse items to the database
    @PostMapping
    public ResponseEntity<Integer> saveInventory(@RequestParam("wareId") int wareId, @RequestParam("gameId") int gameId, @RequestParam("quantity") int quantity) {
        int newInventory = warehouseInventoryService.newInventory(wareId, gameId, quantity);
        return new ResponseEntity<Integer>(newInventory, HttpStatus.OK);
    }

    // Updates inventory totals
    @PutMapping
    public ResponseEntity<Integer> updateInventory(@RequestParam("wareId") int wareId, @RequestParam("gameId") int gameId, @RequestParam("quantity") int quantity) {
        int updateInventory = warehouseInventoryService.updateInventory(wareId, gameId, quantity);
        return new ResponseEntity<Integer>(updateInventory, HttpStatus.OK);
    }

    // Deletes entries from the junction table
    @DeleteMapping
    public ResponseEntity<Warehouse> deleteInventory(@RequestBody WarehouseInventory inventory) {
        warehouseInventoryService.deleteInventory(inventory);
        return ResponseEntity.noContent().build();
    }
    
}
